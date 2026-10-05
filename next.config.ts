import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Build to plain HTML/CSS/JS in out/
	output: "export",
	trailingSlash: true,
	// Let phones on the home network load the dev server (e.g. http://192.168.x.x:3000).
	// Dev-only: Next.js otherwise blocks its dev scripts for other devices, leaving pages half-working.
	allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
