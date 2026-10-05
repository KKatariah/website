"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locations } from "@/lib/locations";
import Button from "./ui/Button";

const mainLinks = [
	{ href: "/", label: "Home" },
	{ href: "https://kkatariah.com/", label: "Minecolonies Planner" },
	{ href: "/contact", label: "Contact" },
];
const mainHrefs = mainLinks.map((l) => l.href);
const moreLinks = locations.filter((l) => !mainHrefs.includes(l.href)).map((l) => ({ href: l.href, label: l.page }));

/**
 * Desktop: main buttons plus a "More" dropdown.
 * Phones: just the title and a "Menu" button whose dropdown lists every page.
 */
export default function SiteNav() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	// Close the dropdown on any outside click or route change
	useEffect(() => {
		if (!open) return;
		const close = () => setOpen(false);
		document.addEventListener("click", close);
		return () => document.removeEventListener("click", close);
	}, [open]);
	useEffect(() => setOpen(false), [pathname]);

	return (
		<nav className="site-nav">
			<Link href="/" className="site-nav-title">
				Katariah&apos;s Website
			</Link>
			<div className="site-nav-links">
				{mainLinks.map((link) => (
					<Button key={link.href} href={link.href} current={pathname === link.href} className="nav-main">
						{link.label}
					</Button>
				))}
				<div className="site-nav-dropdown">
					<Button
						aria-expanded={open}
						onClick={(e) => {
							e.stopPropagation();
							setOpen(!open);
						}}
					>
						<span className="desktop-only">More</span>
						<span className="mobile-only">Menu</span> ▾
					</Button>
					{open && (
						<div className="dropdown-menu">
							{/* Main links appear here too on phones, where the buttons are hidden */}
							{[...mainLinks.map((l) => ({ ...l, mobileOnly: true })), ...moreLinks].map((link) => {
								const className = "mobileOnly" in link ? "dropdown-link mobile-only" : "dropdown-link";
								const current = pathname === link.href ? "page" : undefined;
								return link.href.startsWith("/") ? (
									<Link key={link.href} href={link.href} className={className} aria-current={current}>
										{link.label}
									</Link>
								) : (
									<a key={link.href} href={link.href} className={className}>
										{link.label}
									</a>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
