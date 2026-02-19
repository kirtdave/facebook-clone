import { NextResponse } from 'next/server'

export function middleware(request) {
  const ua = request.headers.get('user-agent') || ''
  if (ua.includes('facebookexternalhit') || ua.includes('Facebot')) {
    return NextResponse.rewrite(new URL('/api/og', request.url))
  }
}

export const config = {
  matcher: '/',
}
```

Then push:
```
git add .
git commit -m "middleware bot detection"
git push