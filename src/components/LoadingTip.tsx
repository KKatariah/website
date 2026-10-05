"use client";

import { useEffect, useState } from "react";

const tips = [
	"Click the markers on the map to fast travel between pages.",
	"Fonts found in Sadrith Mora are free to use, as long as you credit the author.",
	"The cat cannot be pickpocketed. Many have tried.",
	"Topics in Katariah's dialogue window can be revisited at any time.",
	"Hover over items in your inventory to inspect them.",
	"Yes, the website is styled after a game from 2002. That is the point.",
];

/** A random loading-screen tip pinned to the bottom of the screen. */
export default function LoadingTip() {
	const [tip, setTip] = useState<string | null>(null);

	// Picked after mount so the server and client render the same HTML
	useEffect(() => setTip(tips[Math.floor(Math.random() * tips.length)]), []);

	if (!tip) return null;
	return <p className="loading-tip">Tip: {tip}</p>;
}
