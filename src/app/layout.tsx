import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import LoadingTip from "@/components/LoadingTip";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "Katariah's Website",
		template: "%s - Katariah",
	},
	description: "Katariah's Morrowind-themed website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Backdrop />
				<header className="site-header">
					<SiteNav />
				</header>
				{children}
				<LoadingTip />
			</body>
		</html>
	);
}
