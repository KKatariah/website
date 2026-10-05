/**
 * Every page on the site, placed at a town on Vvardenfell.
 * x/y are percentages within the cropped map (see `.map` in globals.css).
 * backdrop is the screenshot behind the page, matching the town's region.
 */
/** fill is the image's average edge colour, which the photo fades into at the screen edges */
export const backdrops = {
	bitterCoast: { src: "/bitter-coast-sunset.webp", fill: "#53544a" },
	balmora: { src: "/balmora-riverside.webp", fill: "#657286" },
	ashlands: { src: "/ashlands-eso.jpg", fill: "#636368" },
	telvanni: { src: "/telvanni-mushroom-towers.jpg", fill: "#4c5159" },
	hlaaluTown: { src: "/hlaalu-canal-town.jpg", fill: "#87959e" },
	swampDusk: { src: "/swamp-dusk-rooftop.webp", fill: "#3c3028" },
};
export type Backdrop = keyof typeof backdrops;

/** Used for any page not listed below (e.g. the 404) */
export const defaultBackdrop: Backdrop = "ashlands";

export type Location = {
	href: string;
	page: string;
	town: string;
	blurb: string;
	x: number;
	y: number;
	backdrop: Backdrop;
};

export const locations: Location[] = [
	{ href: "/", page: "Home", town: "Seyda Neen", blurb: "Where every journey begins.", x: 37.3, y: 82.8, backdrop: "bitterCoast" },
	{ href: "/contact", page: "Contact", town: "Balmora", blurb: "Talk to Katariah.", x: 34.8, y: 65.2, backdrop: "balmora" },
	{ href: "/character", page: "Character", town: "Ghostgate", blurb: "Stats, skills and inventory.", x: 49.5, y: 44.1, backdrop: "ashlands" },
	{ href: "/fonts", page: "My Fonts", town: "Sadrith Mora", blurb: "Telvanni-grade typography.", x: 84.8, y: 51.1, backdrop: "telvanni" },
	{ href: "/music", page: "Music", town: "Suran", blurb: "What I have been listening to.", x: 66.3, y: 67.7, backdrop: "hlaaluTown" },
	{ href: "/minecolonies", page: "Minecolonies Dunmer Addon", town: "Vivec", blurb: "A Dunmer addon for MineColonies.", x: 51.6, y: 88.4, backdrop: "ashlands" },
	{ href: "/pets", page: "My Pets", town: "Dagon Fel", blurb: "Pictures of my cat.", x: 56.5, y: 10.9, backdrop: "swampDusk" },
];
