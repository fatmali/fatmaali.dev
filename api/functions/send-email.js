"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const functions_1 = require("@azure/functions");
const nodemailer = __importStar(require("nodemailer"));
// Helper function to add CORS headers to all responses
function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
    };
}
// Function to verify Turnstile token
async function verifyTurnstile(token, request) {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    const isDev = process.env.NODE_ENV === 'development';
    // For development environment, we can bypass the verification
    if (isDev && token === 'dev-testing-token') {
        console.log("Development mode: Bypassing Turnstile verification");
        return true;
    }
    if (!secretKey) {
        console.error("Turnstile secret key is not defined in environment variables");
        return false;
    }
    try {
        const formData = new URLSearchParams();
        formData.append('secret', secretKey);
        formData.append('response', token);
        // Include the IP address of the user (important for proper verification)
        if (request) {
            const clientIp = request.headers.get('x-forwarded-for') ||
                request.headers.get('cf-connecting-ip');
            if (clientIp) {
                formData.append('remoteip', clientIp);
            }
        }
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = await response.json();
        // Log the full response for debugging
        console.log("Turnstile verification response:", data);
        // Check for specific error codes that might indicate a loop
        if (!data.success && data.hasOwnProperty('error-codes') && data['error-codes'].length > 0) {
            console.error("Turnstile verification failed with error codes:", data['error-codes']);
        }
        return data.success === true;
    }
    catch (error) {
        console.error("Turnstile verification failed:", error);
        return false;
    }
}
// Handle OPTIONS requests for CORS
async function handleOptions() {
    return {
        status: 204,
        headers: corsHeaders()
    };
}
// Handle GET requests
async function handleGet() {
    return {
        status: 200,
        headers: corsHeaders(),
        jsonBody: { message: 'Send email API is working. Please use POST method to send emails.' }
    };
}
// Handle POST requests
async function handlePost(request) {
    const headers = corsHeaders();
    try {
        const body = await request.json();
        const { name, email, subject, message, turnstileToken } = body;
        // Simple validation
        if (!name || !email || !message) {
            return {
                status: 400,
                headers,
                jsonBody: { error: 'Name, email, and message are required' }
            };
        }
        // Validate Turnstile
        if (!turnstileToken) {
            return {
                status: 400,
                headers,
                jsonBody: { error: 'Turnstile verification is required' }
            };
        }
        // Verify Turnstile token
        const isValidToken = await verifyTurnstile(turnstileToken, request);
        if (!isValidToken) {
            return {
                status: 400,
                headers,
                jsonBody: { error: 'Verification failed. Please try again.' }
            };
        }
        console.log("\n\n========================\n\n");
        console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);
        console.log("\n\n========================\n\n");
        // Create email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        // Create email HTML template
        const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 20px;
            margin: 20px 0;
            background-color: #f9f9f9;
          }
          h1 {
            color: #2563eb;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
          }
          .message-box {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 15px;
            margin: 15px 0;
          }
          .footer {
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e0e0e0;
            padding-top: 10px;
            margin-top: 20px;
          }
          .info-row {
            display: flex;
            margin-bottom: 10px;
          }
          .label {
            font-weight: bold;
            width: 100px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Contact Form Submission</h1>
          <div class="info-row">
            <span class="label">Name:</span>
            <span>${name}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span>${email}</span>
          </div>
          <div class="info-row">
            <span class="label">Subject:</span>
            <span>${subject}</span>
          </div>
          <div>
            <p><strong>Message:</strong></p>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="footer">
            This message was sent from your website contact form at ${new Date().toLocaleString()}.
          </div>
        </div>
      </body>
      </html>
    `;
        // Email options
        const mailOptions = {
            from: `"Portfolio Contact Form" <ping@fatmaali.dev>`,
            to: 'ping@fatmaali.dev',
            replyTo: email,
            subject: `Portfolio Contact: ${subject || 'New message'}`,
            html: htmlTemplate,
            text: `New message from ${name} (${email}):\n\nSubject: ${subject}\n\n${message}`
        };
        // Send the email
        await transporter.sendMail(mailOptions);
        return {
            status: 200,
            headers,
            jsonBody: { message: 'Email sent successfully!' }
        };
    }
    catch (error) {
        console.error('Email sending failed:', error);
        return {
            status: 500,
            headers,
            jsonBody: { error: 'Failed to send email' }
        };
    }
}
// Main handler function that routes to appropriate method handlers
async function sendEmail(request, context) {
    context.log('Processing send-email request');
    switch (request.method) {
        case 'OPTIONS':
            return await handleOptions();
        case 'GET':
            return await handleGet();
        case 'POST':
            return await handlePost(request);
        default:
            return {
                status: 405,
                headers: corsHeaders(),
                jsonBody: { error: 'Method not allowed' }
            };
    }
}
exports.sendEmail = sendEmail;
// Register the function with the Azure Functions runtime
functions_1.app.http('send-email', {
    methods: ['GET', 'POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: sendEmail
});
exports.default = functions_1.app;
//# sourceMappingURL=send-email.js.map