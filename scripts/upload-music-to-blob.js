#!/usr/bin/env node

/**
 * Upload Music Files to Azure Blob Storage
 * 
 * This script uploads all music files from public/music to Azure Blob Storage.
 * 
 * Prerequisites:
 * - npm install @azure/storage-blob
 * - Set AZURE_STORAGE_CONNECTION_STRING environment variable
 * 
 * Usage:
 * node scripts/upload-music-to-blob.js
 */

const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");

const MUSIC_DIR = path.join(__dirname, "..", "public", "music");
const CONTAINER_NAME = "music";

async function uploadMusicFiles() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!connectionString) {
    console.error("❌ Error: AZURE_STORAGE_CONNECTION_STRING environment variable is not set");
    console.log("\nPlease set the connection string:");
    console.log('export AZURE_STORAGE_CONNECTION_STRING="<your-connection-string>"\n');
    process.exit(1);
  }

  try {
    console.log("🚀 Starting music file upload to Azure Blob Storage...\n");

    // Create BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    
    // Get container client
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    
    // Create container if it doesn't exist
    const containerExists = await containerClient.exists();
    if (!containerExists) {
      console.log(`📦 Creating container: ${CONTAINER_NAME}`);
      await containerClient.create({
        access: "none", // Private access
      });
    } else {
      console.log(`✅ Container "${CONTAINER_NAME}" already exists`);
    }

    // Read all files from the music directory
    const files = fs.readdirSync(MUSIC_DIR);
    const musicFiles = files.filter(file => 
      file.endsWith(".mp3") || file.endsWith(".mp4")
    );

    if (musicFiles.length === 0) {
      console.log("⚠️  No music files found in", MUSIC_DIR);
      return;
    }

    console.log(`\n📁 Found ${musicFiles.length} music files to upload:\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const file of musicFiles) {
      const filePath = path.join(MUSIC_DIR, file);
      const blobClient = containerClient.getBlockBlobClient(file);

      try {
        // Check if blob already exists
        const exists = await blobClient.exists();
        
        if (exists) {
          console.log(`⏭️  Skipping (already exists): ${file}`);
          skipCount++;
          continue;
        }

        // Get file stats
        const stats = fs.statSync(filePath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`⬆️  Uploading: ${file} (${fileSizeMB} MB)`);

        // Determine content type
        const contentType = file.endsWith(".mp3") ? "audio/mpeg" : "video/mp4";

        // Upload the file
        await blobClient.uploadFile(filePath, {
          blobHTTPHeaders: {
            blobContentType: contentType,
          },
        });

        console.log(`✅ Uploaded: ${file}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error uploading ${file}:`, error.message);
        errorCount++;
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("📊 Upload Summary:");
    console.log("=".repeat(60));
    console.log(`✅ Successfully uploaded: ${successCount} files`);
    console.log(`⏭️  Skipped (already exists): ${skipCount} files`);
    console.log(`❌ Errors: ${errorCount} files`);
    console.log("=".repeat(60));

    if (errorCount > 0) {
      console.log("\n⚠️  Some files failed to upload. Please check the errors above.");
      process.exit(1);
    } else {
      console.log("\n🎉 All music files uploaded successfully!");
      console.log("\n💡 Next steps:");
      console.log("   1. Deploy your infrastructure: azd up");
      console.log("   2. Add music files to .gitignore");
      console.log("   3. Remove local music files from public/music if desired");
    }

  } catch (error) {
    console.error("❌ Fatal error:", error.message);
    process.exit(1);
  }
}

// Run the upload
uploadMusicFiles().catch(console.error);
