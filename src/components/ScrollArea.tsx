"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_THUMB = 24;
const ARROW_STEP = 40;
const REPEAT_DELAY = 300;
const REPEAT_RATE = 50;

/**
 * A scroll box with Morrowind's scrollbar: framed arrow buttons and a stone thumb in a framed track.
 * The content still scrolls natively (wheel, touch, keyboard); the custom bar mirrors and drives it.
 */
export default function ScrollArea({
	children,
	className,
	ref,
	...rest
}: {
	children: React.ReactNode;
	className?: string;
	/** Ref to the scrolling element, e.g. to scroll to the bottom */
	ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
	const contentRef = useRef<HTMLDivElement | null>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const [thumb, setThumb] = useState({ top: 0, height: 0, scrollable: false });

	const setContentRef = useCallback(
		(el: HTMLDivElement | null) => {
			contentRef.current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) ref.current = el;
		},
		[ref],
	);

	const update = useCallback(() => {
		const content = contentRef.current;
		const track = trackRef.current;
		if (!content || !track) return;
		const { scrollTop, scrollHeight, clientHeight } = content;
		const trackHeight = track.clientHeight;
		const height = Math.min(trackHeight, Math.max(MIN_THUMB, (trackHeight * clientHeight) / scrollHeight));
		const maxScroll = scrollHeight - clientHeight;
		const top = maxScroll > 0 ? ((trackHeight - height) * scrollTop) / maxScroll : 0;
		setThumb({ top, height, scrollable: maxScroll > 1 });
	}, []);

	// Re-measure when the box or its content changes size
	useEffect(() => {
		update();
		const observer = new ResizeObserver(update);
		if (contentRef.current) observer.observe(contentRef.current);
		if (innerRef.current) observer.observe(innerRef.current);
		return () => observer.disconnect();
	}, [update]);

	// Drag the thumb
	const drag = useRef<{ startY: number; startScroll: number } | null>(null);
	const onThumbDown = (e: React.PointerEvent) => {
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.setPointerCapture(e.pointerId);
		drag.current = { startY: e.clientY, startScroll: contentRef.current!.scrollTop };
	};
	const onThumbMove = (e: React.PointerEvent) => {
		const content = contentRef.current;
		const track = trackRef.current;
		if (!drag.current || !content || !track) return;
		const travel = track.clientHeight - thumb.height;
		const maxScroll = content.scrollHeight - content.clientHeight;
		if (travel > 0) content.scrollTop = drag.current.startScroll + ((e.clientY - drag.current.startY) * maxScroll) / travel;
	};
	const onThumbUp = () => (drag.current = null);

	// Click the track to page up/down
	const onTrackDown = (e: React.PointerEvent) => {
		const content = contentRef.current;
		if (!content) return;
		const clickY = e.clientY - e.currentTarget.getBoundingClientRect().top;
		const page = content.clientHeight * 0.9;
		content.scrollBy({ top: clickY < thumb.top ? -page : page, behavior: "smooth" });
	};

	// Arrow buttons step once, then repeat while held
	const repeat = useRef<ReturnType<typeof setTimeout> | null>(null);
	const stopRepeat = () => {
		if (repeat.current) clearTimeout(repeat.current);
		repeat.current = null;
	};
	const onArrowDown = (direction: 1 | -1) => (e: React.PointerEvent) => {
		e.preventDefault();
		const step = () => contentRef.current?.scrollBy({ top: direction * ARROW_STEP });
		step();
		const loop = () => {
			step();
			repeat.current = setTimeout(loop, REPEAT_RATE);
		};
		repeat.current = setTimeout(loop, REPEAT_DELAY);
	};
	useEffect(() => stopRepeat, []);

	return (
		<div className={`mw-scroll ${className ?? ""}`}>
			<div ref={setContentRef} className="mw-scroll-content" tabIndex={0} onScroll={update} {...rest}>
				<div ref={innerRef}>{children}</div>
			</div>
			{/* Mouse-only mirror of the native scroll position; keyboard and screen readers use the content itself.
			    Hidden (but still taking space, so text doesn't reflow) when there's nothing to scroll. */}
			<div className={`mw-scroll-bar${thumb.scrollable ? "" : " hidden"}`} aria-hidden>
				<div
					className="mw-scroll-button up"
					onPointerDown={onArrowDown(-1)}
					onPointerUp={stopRepeat}
					onPointerLeave={stopRepeat}
					onPointerCancel={stopRepeat}
				/>
				<div ref={trackRef} className="mw-scroll-track" onPointerDown={onTrackDown}>
					<div
						className="mw-scroll-thumb"
						style={{ top: thumb.top, height: thumb.height }}
						onPointerDown={onThumbDown}
						onPointerMove={onThumbMove}
						onPointerUp={onThumbUp}
						onPointerCancel={onThumbUp}
					/>
				</div>
				<div
					className="mw-scroll-button down"
					onPointerDown={onArrowDown(1)}
					onPointerUp={stopRepeat}
					onPointerLeave={stopRepeat}
					onPointerCancel={stopRepeat}
				/>
			</div>
		</div>
	);
}
