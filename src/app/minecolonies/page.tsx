import type { Metadata } from "next";
import Panel from "@/components/Panel";
import Frame from "@/components/ui/Frame";

export const metadata: Metadata = { title: "Minecolonies Dunmer Addon" };

const packs = [
	{
		name: "Dunmer Name Pack",
		description: "Custom Dunmer names for your colonists.",
	},
	{
		name: "Dunmer Skin Pack",
		description: "Custom Dunmer skins for your colonists.",
	},
];

export default function MinecoloniesPage() {
	return (
		<Panel
			title="Minecolonies Dunmer Addon"
			banners={["tx_banner_temple_01", "tx_banner_redoran_01"]}
		>
			<p>
				An addon for the Minecraft mod{" "}
				<a href="https://minecolonies.com/">MineColonies</a> that turns your
				colonists into Dunmer, the Dark Elves of Morrowind.
			</p>
			<p className="coming-soon">Coming soon</p>
			{packs.map((pack) => (
				<Frame key={pack.name}>
					<h2>{pack.name}</h2>
					<p>{pack.description}</p>
					<p className="muted">Status: in progress</p>
				</Frame>
			))}
			<Frame>
				<h2>Someday...</h2>
				<p>
					One day I&apos;d love to make a better skin pack with custom clothes,
					and I dream of making a custom style pack for Morrowind-inspired
					buildings. Alas, I don&apos;t currently have the time (or, quite
					frankly, the talent).
				</p>
			</Frame>
			<p className="muted" style={{ marginTop: 20 }}>
				In the meantime, plan your colony with my{" "}
				<a href="https://kkatariah.com/">MineColonies planner</a>.
			</p>
		</Panel>
	);
}
