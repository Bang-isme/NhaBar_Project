import type { NextConfig } from "next";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    // "attachment" blocks SVG rendering in <img> — CSP sandbox below already
    // neutralizes scripts inside SVGs, so inline display is safe.
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src 'self' data: blob: https://picsum.photos https://maps.gstatic.com https://maps.googleapis.com https://*.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
              `connect-src 'self' ${apiUrl}`,
              "frame-src https://maps.google.com https://www.google.com",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  env: {
    SITE_URL: siteUrl,
  },
};

export default nextConfig;
