import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ===== 1️⃣ HTML Escaping Function =====
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req) {
  try {
    const { name, email, subject, message, token } = await req.json();

    // ===== Validate fields =====
    if (!name || !email || !subject || !message || !token) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // ===== Verify reCAPTCHA =====
    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
      }
    );

    const captchaData = await captchaRes.json();

    if (!captchaData.success || captchaData.score < 0.1) {
      return new Response(
        JSON.stringify({ error: "reCAPTCHA verification failed", captcha: captchaData }),
        { status: 400 }
      );
    }

    // ===== Import Resend dynamically =====
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // ===== Send emails =====
   const{error:sendError} = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["shivanikaiche24@gmail.com"],
      subject: `New message from ${name}: ${subject}`,
      html: `<p>${message}</p>`,
    });

     if (sendError) {
      console.error("Resend error:", sendError);
      return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
    }
    const {error: replyError}=await resend.emails.send({
      from: "Shivani Kaiche <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for contacting me!",
      html: `<p>Thank you ${name}, your message has been received!</p>`,
    });

    if (replyError) console.error("Auto-reply failed:", replyError);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
  }
}
