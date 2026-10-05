"use client";

import { useEffect, useState } from "react";
import { getTopTracks, type Period, type Track } from "@/lib/lastfm";
import Button from "./ui/Button";

const periods: [Period, string][] = [
	["7day", "Week"],
	["1month", "Month"],
	["12month", "Year"],
	["overall", "All Time"],
];

/** Most-played tracks, with inventory-style tabs for the time range. */
export default function TopTracks() {
	const [period, setPeriod] = useState<Period>("1month");
	const [tracks, setTracks] = useState<Track[] | null>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		let current = true;
		setTracks(null);
		setError(false);
		getTopTracks(period)
			.then((result) => current && setTracks(result))
			.catch(() => current && setError(true));
		// Ignore a slow response for a tab that's no longer selected
		return () => {
			current = false;
		};
	}, [period]);

	return (
		<>
			<div className="inventory-tabs" role="tablist">
				{periods.map(([value, label]) => (
					<Button key={value} pressed={period === value} onClick={() => setPeriod(value)}>
						{label}
					</Button>
				))}
			</div>
			{error ? (
				<p className="muted">The scrolls are unreadable right now. Try again later.</p>
			) : !tracks ? (
				<p className="muted">Consulting the scrolls...</p>
			) : tracks.length === 0 ? (
				<p className="muted">Nothing played in this time.</p>
			) : (
				<ol className="track-list">
					{tracks.map((track) => (
						<li key={track.url} className="stat-row">
							<span>
								<a href={track.url}>{track.name}</a> <span className="muted">by {track.artist}</span>
							</span>
							<span>{track.playcount} plays</span>
						</li>
					))}
				</ol>
			)}
		</>
	);
}
