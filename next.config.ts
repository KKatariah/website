import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Let phones on the home network load the dev server (e.g. http://192.168.x.x:3000).
	// Dev-only: Next.js otherwise blocks its dev scripts for other devices, leaving pages half-working.
	allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
	images: {
		// Try AVIF first (smallest), fall back to WebP
		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
