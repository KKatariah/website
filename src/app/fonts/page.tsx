import type { Metadata } from "next";
import Panel from "@/components/Panel";
import Frame from "@/components/ui/Frame";

export const metadata: Metadata = { title: "My Fonts" };

const fonts = [
	{ name: "Katariah Olde", family: '"Katariah Olde", MagicCards, serif', file: "Katariah_Olde_Regular.ttf" },
	{ name: "Ari Handwriting", family: '"Ari Handwriting", MagicCards, serif', file: "Ari_Handwriting_Regular.ttf" },
];

export default function FontsPage() {
	return (
		<Panel title="My Fonts" banners={["tx_de_banner_telvani_01", "tx_bannerd_alchemy_01"]}>
			<p>
				Some fonts I have made recently. I&apos;m still working on getting Bold and thin versions along with
				the Regular ones, as well as expanding the character support for maths and more obscure punctuation.
			</p>
			<p style={{ marginBottom: 24 }}>
				Feel free to use them for whatever you like, as long as you credit me (I&apos;d love to see what you use
				them for!)
			</p>
			{fonts.map((font) => (
				<Frame key={font.name}>
					<div className="font-title" style={{ fontFamily: font.family }}>
						{font.name}
					</div>
					<div className="sample-text" style={{ fontFamily: font.family }}>
						The quick brown fox jumps over the lazy dog 12345!?&amp;
					</div>
					<a href={`/fonts/${font.file}`} download>
						Download {font.name} Regular.ttf
					</a>
				</Frame>
			))}
		</Panel>
	);
}
