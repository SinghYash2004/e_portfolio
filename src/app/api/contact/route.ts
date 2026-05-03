import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // TODO: Integrate with your email service here
    // Options:
    // 1. Nodemailer (for hosting with Node.js)
    // 2. SendGrid (recommended for serverless)
    // 3. Mailgun
    // 4. Resend
    // 5. AWS SES

    // Example with Resend (install: npm install resend):
    // const { Resend } = require("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: process.env.CONTACT_EMAIL,
    //   replyTo: email,
    //   subject: `New message from ${name}: ${subject}`,
    //   html: `<p>From: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    // });

    // For now, just log the message (you can check in your server logs)
    console.log("New contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // You can also save to a database here if needed
    // await db.contactMessages.create({ name, email, subject, message });

    return NextResponse.json(
      { message: "Message sent successfully! We'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process message. Please try again later." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
