"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("@azure/functions");
const storage_blob_1 = require("@azure/storage-blob");
// Helper function to add CORS headers to all responses
function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Range',
        'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges',
        'Access-Control-Max-Age': '86400'
    };
}
// Parse connection string to extract account name and key
function parseConnectionString(connectionString) {
    const parts = connectionString.split(';');
    let accountName = '';
    let accountKey = '';
    for (const part of parts) {
        if (part.startsWith('AccountName=')) {
            accountName = part.substring('AccountName='.length);
        }
        else if (part.startsWith('AccountKey=')) {
            accountKey = part.substring('AccountKey='.length);
        }
    }
    if (!accountName || !accountKey) {
        throw new Error('Invalid connection string: missing AccountName or AccountKey');
    }
    return { accountName, accountKey };
}
// Generate a SAS URL with read permissions
function generateSasUrl(accountName, accountKey, containerName, blobName, expiresInMinutes = 60) {
    const sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(accountName, accountKey);
    const sasOptions = {
        containerName,
        blobName,
        permissions: storage_blob_1.BlobSASPermissions.parse("r"),
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + expiresInMinutes * 60 * 1000),
    };
    const sasToken = (0, storage_blob_1.generateBlobSASQueryParameters)(sasOptions, sharedKeyCredential).toString();
    return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
}
async function getMusicHandler(request, context) {
    context.log(`Get music function triggered by request to ${request.url}`);
    // Handle preflight request
    if (request.method === 'OPTIONS') {
        return {
            status: 204,
            headers: corsHeaders()
        };
    }
    try {
        // Get the filename from query parameter
        const filename = request.query.get('file');
        if (!filename) {
            return {
                status: 400,
                headers: corsHeaders(),
                jsonBody: {
                    error: 'Missing required query parameter: file'
                }
            };
        }
        // Validate filename (basic security check)
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return {
                status: 400,
                headers: corsHeaders(),
                jsonBody: {
                    error: 'Invalid filename'
                }
            };
        }
        // Get configuration from environment variables
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const containerName = process.env.MUSIC_CONTAINER_NAME || 'music';
        if (!connectionString) {
            context.error('AZURE_STORAGE_CONNECTION_STRING is not configured');
            return {
                status: 500,
                headers: corsHeaders(),
                jsonBody: {
                    error: 'Storage configuration error'
                }
            };
        }
        // Parse connection string
        const { accountName, accountKey } = parseConnectionString(connectionString);
        // Create BlobServiceClient
        const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(filename);
        // Check if blob exists
        const exists = await blobClient.exists();
        if (!exists) {
            return {
                status: 404,
                headers: corsHeaders(),
                jsonBody: {
                    error: 'Music file not found'
                }
            };
        }
        // Get blob properties to determine content type
        const properties = await blobClient.getProperties();
        const contentType = properties.contentType || 'application/octet-stream';
        // Generate SAS URL with 1 hour expiration
        const sasUrl = generateSasUrl(accountName, accountKey, containerName, filename, 60);
        // Check if this is a range request for streaming
        const rangeHeader = request.headers.get('range');
        if (rangeHeader) {
            // For range requests, redirect to the blob with SAS token
            // This allows the browser to handle range requests directly
            return {
                status: 302,
                headers: {
                    ...corsHeaders(),
                    'Location': sasUrl,
                    'Cache-Control': 'public, max-age=3600'
                }
            };
        }
        // For regular requests, return the SAS URL in JSON
        // This allows the frontend to use it directly in the audio element
        return {
            status: 200,
            headers: {
                ...corsHeaders(),
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
            },
            jsonBody: {
                url: sasUrl,
                filename: filename,
                contentType: contentType,
                expiresIn: 3600 // seconds
            }
        };
    }
    catch (error) {
        context.error('Error retrieving music file:', error);
        return {
            status: 500,
            headers: corsHeaders(),
            jsonBody: {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            }
        };
    }
}
functions_1.app.http('get-music', {
    methods: ['GET', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'music',
    handler: getMusicHandler
});
//# sourceMappingURL=get-music.js.map