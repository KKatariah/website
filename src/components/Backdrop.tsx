"use client";

import { usePathname } from "next/navigation";
import { backdrops, defaultBackdrop, locations, type Backdrop as BackdropName } from "@/lib/locations";

/** Full-screen game screenshot behind every page; crossfades when the region changes. */
export default function Backdrop() {
	const pathname = usePathname();
	const active = locations.find((l) => l.href === pathname)?.backdrop ?? defaultBackdrop;

	return (
		<div aria-hidden>
			{(Object.keys(backdrops) as BackdropName[]).map((name) => (
				<div
					key={name}
					className={`backdrop${name === active ? " active" : ""}`}
					style={{ backgroundColor: backdrops[name].fill }}
				>
					<div className="backdrop-image" style={{ backgroundImage: `url(${backdrops[name].src})` }} />
				</div>
			))}
			<div className="backdrop-shade" />
		</div>
	);
}
