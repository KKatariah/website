"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

const OFFSET = 18;
const MAX_WIDTH = 260;

/** Morrowind-style tooltip that follows the cursor. */
export default function Tooltip({
	content,
	children,
	className,
	style,
}: {
	content: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

	// Flip to the left of the cursor near the right edge of the screen
	const left = pos && (pos.x + OFFSET + MAX_WIDTH > window.innerWidth ? pos.x - OFFSET - MAX_WIDTH : pos.x + OFFSET);

	return (
		<div
			className={className}
			style={style}
			onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
			onMouseLeave={() => setPos(null)}
		>
			{children}
			{/* Portalled to <body> so transformed or clipped ancestors can't trap it */}
			{pos &&
				createPortal(
					<div className="mw-tooltip" role="tooltip" style={{ left: left!, top: pos.y + OFFSET }}>
						{content}
					</div>,
					document.body,
				)}
		</div>
	);
}
