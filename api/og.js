export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(`<!doctype html>
<html>
<head>
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://facebook-clone-one-sand.vercel.app/" />
  <meta property="og:title" content="facebook" />
  <meta property="og:description" content="Your description here" />
  <meta property="og:image" content="https://facebook-clone-one-sand.vercel.app/template.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://facebook-clone-one-sand.vercel.app/template.png" />
</head>
<body></body>
</html>`);
}
