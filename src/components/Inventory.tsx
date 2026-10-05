"use client";

import Link from "next/link";
import { useState } from "react";
import Tooltip from "./Tooltip";
import Button from "./ui/Button";
import Frame from "./ui/Frame";

export type Item = { name: string; category: string; description: string; href?: string };

/** Inventory grid with the game's category tabs; hover an item to inspect it. */
export default function Inventory({ categories, items }: { categories: string[]; items: Item[] }) {
	const [tab, setTab] = useState("All");
	const shown = tab === "All" ? items : items.filter((i) => i.category === tab);

	return (
		<>
			<div className="inventory-tabs" role="tablist">
				{["All", ...categories].map((c) => (
					<Button key={c} pressed={tab === c} onClick={() => setTab(c)}>
						{c}
					</Button>
				))}
			</div>
			<Frame scroll className="inventory-scroll">
				<div className="inventory-grid">
					{shown.map((item) => (
						<Tooltip
							key={item.name}
							content={
								<>
									<strong>{item.name}</strong>
									{item.description}
								</>
							}
						>
							{item.href ? (
								<Link href={item.href} className="inventory-item">
									{item.name}
								</Link>
							) : (
								<div className="inventory-item">{item.name}</div>
							)}
						</Tooltip>
					))}
				</div>
			</Frame>
		</>
	);
}
