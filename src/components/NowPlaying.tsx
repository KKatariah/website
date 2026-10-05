"use client";

import { useEffect, useState } from "react";
import { getLatestTrack, type Track } from "@/lib/lastfm";

const REFRESH_MS = 30_000;

function timeAgo(seconds: number) {
	const minutes = Math.round((Date.now() / 1000 - seconds) / 60);
	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes} min ago`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
	const days = Math.round(hours / 24);
	return `${days} day${days === 1 ? "" : "s"} ago`;
}

/** Current (or last played) track, re-checked every 30 seconds while the tab is open. */
export default function NowPlaying() {
	const [track, setTrack] = useState<Track | null>(null);
	const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

	useEffect(() => {
		const load = () => {
			if (document.hidden) return;
			getLatestTrack()
				.then((latest) => {
					setTrack(latest);
					setStatus("ready");
				})
				// Keep showing the last track we got if a later refresh fails
				.catch(() => setStatus((s) => (s === "ready" ? s : "error")));
		};
		load();
		const timer = setInterval(load, REFRESH_MS);
		return () => clearInterval(timer);
	}, []);

	if (status === "loading") return <p className="muted">Consulting the scrolls...</p>;
	if (status === "error") return <p className="muted">The scrolls are unreadable right now. Try again later.</p>;
	if (!track) return <p className="muted">Katariah has not listened to anything yet.</p>;

	return (
		<div className="now-playing">
			{track.image ? (
				<img className="album-art thin-border" src={track.image} alt={track.album ?? ""} />
			) : (
				<div className="album-art thin-border" aria-hidden />
			)}
			<div>
				<div className="now-playing-label muted">
					{track.nowPlaying ? "Listening now" : `Last played ${track.playedAt ? timeAgo(track.playedAt) : ""}`}
				</div>
				<a className="now-playing-title" href={track.url}>
					{track.name}
				</a>
				<div>{track.artist}</div>
				{track.album && <div className="muted">{track.album}</div>}
			</div>
		</div>
	);
}
