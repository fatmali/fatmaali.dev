import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper function to add CORS headers to all responses
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const isDev = process.env.NODE_ENV === 'development';
  
  // For development environment, we can bypass the reCAPTCHA verification
  if (isDev && token === 'dev-testing-token') {
    console.log("Development mode: Bypassing reCAPTCHA verification");
    return true;
  }
  
  if (!secretKey) {
    console.error("reCAPTCHA secret key is not defined in environment variables");
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    
    // Log the full response for debugging
    console.log("reCAPTCHA verification response:", data);
    
    // For reCAPTCHA v3, check both success and score
    // Typically, a score of 0.5 or higher is considered a human user
    if (data.success && data.score) {
      // You can adjust this threshold based on your tolerance for risk
      const threshold = 0.5;
      return data.score >= threshold;
    }
    
    return data.success;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return false;
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    { message: 'Send email API is working. Please use POST method to send emails.' },
    { 
      status: 200,
      headers: corsHeaders()
    }
  );
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { 
    status: 200,
    headers: corsHeaders()
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, subject, message, captchaToken } = data;

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { 
          status: 400,
          headers: corsHeaders()
        }
      );
    }

    // Validate reCAPTCHA
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification is required' },
        { 
          status: 400,
          headers: corsHeaders()
        }
      );
    }

    // Verify reCAPTCHA token
    const isValidCaptcha = await verifyRecaptcha(captchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { 
          status: 400,
          headers: corsHeaders()
        }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true, 
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASSWORD,
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
      text: `New message from ${name} (${email}):\n\nSubject: ${subject}\n\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: `Email sent successfully!` },
      { 
        status: 200,
        headers: corsHeaders()
      }
    );
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { 
        status: 500,
        headers: corsHeaders()
      }
    );
  }
}