"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locations } from "@/lib/locations";
import Tooltip from "./Tooltip";
import Frame from "./ui/Frame";

/** Vvardenfell with each page as a town marker — click one to fast travel. */
export default function MapNav() {
	const pathname = usePathname();
	return (
		<>
			<Frame variant="plain" className="map">
				{locations.map((l) => (
					<Tooltip
						key={l.href}
						className="map-pin"
						style={{ left: `${l.x}%`, top: `${l.y}%` }}
						content={
							<>
								<strong>{l.town}</strong>
								{l.page} — {l.blurb}
							</>
						}
					>
						<Link
							href={l.href}
							aria-current={pathname === l.href ? "page" : undefined}
							className="map-marker"
						>
							{l.page}
						</Link>
					</Tooltip>
				))}
			</Frame>
			<p className="map-caption muted">Click a marker to fast travel</p>
		</>
	);
}
