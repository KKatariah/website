// Last.fm scrobbles what Spotify plays; its read-only API only needs a public key, so pages fetch it from the browser.
// Set both in .env.local.
const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY ?? "";
export const LASTFM_USER = process.env.NEXT_PUBLIC_LASTFM_USER ?? "";
export const lastfmConfigured = Boolean(API_KEY && LASTFM_USER);

export type Track = {
	name: string;
	artist: string;
	url: string;
	album?: string;
	image?: string;
	nowPlaying?: boolean;
	/** Unix seconds; absent while the track is still playing */
	playedAt?: number;
	playcount?: number;
};

export type Period = "7day" | "1month" | "12month" | "overall";

type LastfmImage = { size: string; "#text": string };

// Last.fm's grey star, sent when it has no cover art
const BLANK_IMAGE = "2a96cbd8b46e442fc41c2b86b821562f";

async function call(method: string, params: Record<string, string>) {
	const query = new URLSearchParams({
		method,
		user: LASTFM_USER,
		api_key: API_KEY,
		format: "json",
		...params,
	});
	const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${query}`);
	const json = await response.json();
	if (!response.ok || json.error)
		throw new Error(json.message ?? `Last.fm returned ${response.status}`);
	return json;
}

function largestImage(images: LastfmImage[] = []) {
	const url = images.at(-1)?.["#text"];
	return url && !url.includes(BLANK_IMAGE) ? url : undefined;
}

/** The track playing right now, or the last one played. */
export async function getLatestTrack(): Promise<Track | null> {
	const json = await call("user.getrecenttracks", { limit: "1" });
	const track = json.recenttracks.track[0];
	if (!track) return null;
	return {
		name: track.name,
		artist: track.artist["#text"],
		url: track.url,
		album: track.album["#text"] || undefined,
		image: largestImage(track.image),
		nowPlaying: track["@attr"]?.nowplaying === "true",
		playedAt: track.date ? Number(track.date.uts) : undefined,
	};
}

export async function getTopTracks(
	period: Period,
	limit = 10,
): Promise<Track[]> {
	const json = await call("user.gettoptracks", {
		period,
		limit: String(limit),
	});
	return json.toptracks.track.map(
		(track: {
			name: string;
			artist: { name: string };
			url: string;
			playcount: string;
		}) => ({
			name: track.name,
			artist: track.artist.name,
			url: track.url,
			playcount: Number(track.playcount),
		}),
	);
}
