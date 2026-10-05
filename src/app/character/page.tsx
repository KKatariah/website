import type { Metadata } from "next";
import Inventory, { type Item } from "@/components/Inventory";
import StatRows from "@/components/StatRows";
import StatusBar from "@/components/StatusBar";
import Window from "@/components/Window";
import Frame from "@/components/ui/Frame";

export const metadata: Metadata = { title: "Character" };

/*
 * A level 20 female Dark Elf Mage born under the Atronach, played the way a mage plays.
 * Starting point (character creation): female Dunmer attributes, +10 Int/Wil (Mage); skills
 * major 30 / minor 15 / misc 5, +5 magic specialisation, Dunmer racial bonuses.
 * Levelling follows the game's rules: 19 level-ups = 190 major/minor skill increases, and each
 * level-up raises 3 attributes by up to +5 depending on how much their governing skills were trained.
 */
const attributes: [string, number][] = [
	["Strength", 47], // 40, +1 ×7 (filler picks)
	["Intelligence", 85], // 50, +5 ×5, +2 ×5 (Alchemy, Enchant, Conjuration)
	["Willpower", 90], // 40, +5 ×10 (Destruction, Alteration, Restoration, Mysticism)
	["Agility", 46], // 40, +2 ×3 (Short Blade, Light Armor)
	["Speed", 75], // 50, +5 ×5 (Athletics, Unarmored)
	["Endurance", 50], // 30, +2 ×10 (Medium Armor)
	["Personality", 55], // 40, +3 ×5 (Illusion, Speechcraft, Mercantile)
	["Luck", 47], // 40, +1 ×7
];
const attr = Object.fromEntries(attributes);

// Health depends on Endurance at each level-up, so it's tallied rather than derived:
// 35 at level 1, then +10% of Endurance per level (32, 34 … 50 over levels 2–11, then 50 ×9) = 35 + 41 + 45
const health = 121;
const magicka = Math.floor(attr.Intelligence * 2.5); // base ×1, Atronach adds ×1.5 → 212
const fatigue = attr.Strength + attr.Willpower + attr.Agility + attr.Endurance; // 233
const encumbrance = attr.Strength * 5; // 235

const bars = [
	{ label: "Health", value: health, max: health, color: "var(--mw-health)" },
	{ label: "Magicka", value: magicka, max: magicka, color: "var(--mw-magic)" },
	{ label: "Fatigue", value: fatigue, max: fatigue, color: "var(--mw-fatigue)" },
];

const info: [string, string | number][] = [
	["Level", 20],
	["Race", "Dark Elf"],
	["Class", "Mage"],
	["Sign", "The Atronach"],
];

// Major +120 and minor +70 over the starting values = the 190 increases behind 19 level-ups
const skills: { title: string; rows: [string, number][] }[] = [
	{
		title: "Major Skills",
		rows: [["Alteration", 65], ["Destruction", 75], ["Illusion", 55], ["Mysticism", 60], ["Restoration", 55]],
	},
	{
		title: "Minor Skills",
		rows: [["Alchemy", 50], ["Conjuration", 30], ["Enchant", 35], ["Short Blade", 30], ["Unarmored", 30]],
	},
	{
		title: "Misc Skills",
		rows: [
			["Acrobatics", 5],
			["Armorer", 5],
			["Athletics", 50],
			["Axe", 5],
			["Block", 5],
			["Blunt Weapon", 5],
			["Hand-to-hand", 5],
			["Heavy Armor", 5],
			["Light Armor", 20],
			["Long Blade", 10],
			["Marksman", 10],
			["Medium Armor", 15],
			["Mercantile", 10],
			["Security", 5],
			["Sneak", 5],
			["Spear", 5],
			["Speechcraft", 15],
		],
	},
];

// Spell costs are the game's own (most read off the in-game spell menu in mwui.webp)
const knownSpells: { name: string; school: string; cost: number }[] = [
	{ name: "Almsivi Intervention", school: "Mysticism", cost: 8 },
	{ name: "Burden", school: "Alteration", cost: 15 },
	{ name: "Cure Common Disease", school: "Restoration", cost: 15 },
	{ name: "Detect Key", school: "Mysticism", cost: 13 },
	{ name: "Divine Intervention", school: "Mysticism", cost: 8 },
	{ name: "Feather", school: "Alteration", cost: 10 },
	{ name: "Fire Bite", school: "Destruction", cost: 6 },
	{ name: "Frostbite", school: "Destruction", cost: 6 },
	{ name: "Levitate", school: "Alteration", cost: 45 },
	{ name: "Light", school: "Illusion", cost: 9 },
	{ name: "Mark", school: "Mysticism", cost: 18 },
	{ name: "Recall", school: "Mysticism", cost: 18 },
];

// The game's cast chance at full fatigue: (school skill × 2 + Willpower / 5 + Luck / 10 − cost) × 1.25, capped 0–100
const skillValue = Object.fromEntries(skills.flatMap((group) => group.rows));
const castChance = (school: string, cost: number) =>
	Math.max(0, Math.min(100, Math.floor((skillValue[school] * 2 + attr.Willpower / 5 + attr.Luck / 10 - cost) * 1.25)));

const spells: [string, string][] = knownSpells.map((spell) => [
	spell.name,
	`${spell.cost}/${castChance(spell.school, spell.cost)}`,
]);

// Projects as inventory items — the game's tabs, mapped to kinds of work
const categories = ["Weapons", "Apparel", "Magic", "Misc"];
const items: Item[] = [
	{ name: "This Website", category: "Weapons", description: "Next.js, React, and far too many border images." },
	{ name: "Minecolonies Planner", category: "Weapons", description: "Plan your colony before you build it.", href: "https://kkatariah.com/" },
	{ name: "Fashion Designs", category: "Apparel", description: "Clothing designs. Coming soon." },
	{ name: "Dunmer Skin Pack", category: "Apparel", description: "Dunmer skins for Minecolonies colonists. Coming soon.", href: "/minecolonies" },
	{ name: "Katariah Olde", category: "Magic", description: "A hand-made font. Free with credit.", href: "/fonts" },
	{ name: "Ari Handwriting", category: "Magic", description: "A handwriting font. Free with credit.", href: "/fonts" },
	{ name: "Dunmer Name Pack", category: "Misc", description: "Dunmer names for Minecolonies colonists. Coming soon.", href: "/minecolonies" },
	{ name: "Music Taste", category: "Misc", description: "What I'm listening to, live.", href: "/music" },
	{ name: "Cat", category: "Misc", description: "Value: priceless. Weight: considerable.", href: "/pets" },
];

export default function CharacterPage() {
	return (
		<main className="page wide character-grid">
			{/* Laid out like the game's menu mode: stats | map | spellbook, inventory along the bottom */}
			<Window title="Katariah" style={{ gridArea: "stats" }}>
				<div className="sheet-cols">
					<div>
						<Frame variant="sheet">
							{bars.map((bar) => (
								<div key={bar.label} className="bar-row">
									<span>{bar.label}</span>
									<StatusBar value={bar.value} max={bar.max} color={bar.color} />
								</div>
							))}
						</Frame>
						<Frame variant="sheet">
							<StatRows rows={info} />
						</Frame>
						<Frame variant="sheet">
							<StatRows rows={attributes} />
						</Frame>
					</div>
					<Frame variant="sheet" scroll className="sheet-scroll">
						{skills.map((group) => (
							<div key={group.title} className="sheet-group">
								<div className="sheet-heading">{group.title}</div>
								<StatRows rows={group.rows} />
							</div>
						))}
					</Frame>
				</div>
			</Window>

			<Window title="Map" style={{ gridArea: "map" }}>
				<Frame variant="plain" className="sheet-map" />
			</Window>

			<Window title="Spellbook" style={{ gridArea: "spells" }}>
				<Frame variant="sheet" scroll className="sheet-scroll">
					<div className="sheet-group">
						<div className="sheet-heading">Powers</div>
						<div>Ancestor Guardian</div>
					</div>
					<div className="sheet-group">
						<div className="stat-row sheet-heading">
							<span>Spells</span>
							<span>Cost/Chance</span>
						</div>
						<StatRows rows={spells} />
					</div>
				</Frame>
			</Window>

			<Window title="Inventory" style={{ gridArea: "inv" }}>
				<div className="inventory-layout">
					<div className="inventory-side">
						{/* Encumbrance, as in the game's inventory window: max is 5 × Strength */}
						<StatusBar value={78} max={encumbrance} color="var(--mw-magic)" />
						<Frame variant="plain" className="avatar" />
					</div>
					<div className="inventory-main">
						<Inventory categories={categories} items={items} />
					</div>
				</div>
			</Window>
		</main>
	);
}
