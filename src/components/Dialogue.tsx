"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import Frame from "./ui/Frame";

/** A list of responses means one is picked at random each time, like "latest rumors" in the game */
export type Topic = { name: string; response: React.ReactNode | React.ReactNode[] };

const responseCount = (topic: Topic) => (Array.isArray(topic.response) ? topic.response.length : 1);

/** Random response: unheard ones first, then any, never the same one twice in a row */
function pickResponse(count: number, heard: number[]) {
	const all = [...Array(count).keys()];
	const unheard = all.filter((i) => !heard.includes(i));
	const last = heard.at(-1);
	const pool = unheard.length ? unheard : all.filter((i) => count < 2 || i !== last);
	return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Morrowind's NPC dialogue window: conversation log on the left, topics on the right.
 * Clicking a topic appends the reply to the log, just like asking about a topic in-game.
 */
export default function Dialogue({ greeting, topics }: { greeting: React.ReactNode; topics: Topic[] }) {
	// Each entry remembers which response it got, so earlier replies don't change on re-render
	const [asked, setAsked] = useState<{ name: string; index: number }[]>([]);
	const logRef = useRef<HTMLDivElement>(null);
	const heardIndexes = (name: string) => asked.filter((a) => a.name === name).map((a) => a.index);

	useEffect(() => {
		const log = logRef.current;
		if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
	}, [asked]);

	return (
		<div className="dialogue">
			<Frame scroll ref={logRef} className="dialogue-log" aria-live="polite">
				<p className="dialogue-entry">{greeting}</p>
				{asked.map(({ name, index }, i) => {
					const response = topics.find((t) => t.name === name)?.response;
					return (
						<div key={i} className="dialogue-entry">
							<span className="dialogue-topic">{name}</span>
							{Array.isArray(response) ? response[index] : response}
						</div>
					);
				})}
			</Frame>
			<div className="dialogue-side">
				<Frame scroll className="dialogue-topics">
					{topics.map((t) => (
						<button
							key={t.name}
							// Turns blue once everything this topic has to say has been heard, as in-game
							aria-pressed={new Set(heardIndexes(t.name)).size === responseCount(t)}
							onClick={() =>
								setAsked((prev) => {
									const heard = prev.filter((a) => a.name === t.name).map((a) => a.index);
									return [...prev, { name: t.name, index: pickResponse(responseCount(t), heard) }];
								})
							}
						>
							{t.name}
						</button>
					))}
				</Frame>
				<Button href="/">Goodbye</Button>
			</div>
		</div>
	);
}
