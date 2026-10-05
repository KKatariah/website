import type { Metadata } from "next";
import NowPlaying from "@/components/NowPlaying";
import Panel from "@/components/Panel";
import TopTracks from "@/components/TopTracks";
import Frame from "@/components/ui/Frame";
import { lastfmConfigured } from "@/lib/lastfm";

export const metadata: Metadata = { title: "Music" };

export default function MusicPage() {
	return (
		<Panel title="Music" banners={["tx_bannerd_tavern_01", "tx_de_banner_book_01"]}>
			<p style={{ marginBottom: 24 }}>
				What I&apos;m listening to right now, and what I&apos;ve had on repeat lately. Updates live from my
				Spotify (via Last.fm).
			</p>
			{lastfmConfigured ? (
				<>
					<Frame>
						<h2>Now Playing</h2>
						<NowPlaying />
					</Frame>
					<Frame>
						<h2>Most Played</h2>
						<TopTracks />
					</Frame>
				</>
			) : (
				<p className="muted">The bard is tuning up. Listening history will appear here soon.</p>
			)}
		</Panel>
	);
}
