import type { Metadata } from "next";
import Link from "next/link";
import Banner from "@/components/Banner";
import Dialogue, { type Topic } from "@/components/Dialogue";
import Window from "@/components/Window";

export const metadata: Metadata = { title: "Contact" };

const topics: Topic[] = [
	{
		name: "email",
		response: (
			<p>
				Letters can be sent to{" "}
				<a href="mailto:kittykatz1344@ucc.asn.au">kittykatz1344@ucc.asn.au</a>.
				I read them. Eventually.
			</p>
		),
	},
	{
		name: "GitHub",
		response: (
			<p>
				My code is kept at{" "}
				<a href="https://github.com/KKatariah">github.com/KKatariah</a>. Mind
				the dust.
			</p>
		),
	},
	{
		name: "Discord",
		response: (
			<p>
				I go by{" "}
				<a href="https://discordapp.com/users/336410729676800000">kkatariah</a>{" "}
				on Discord.
			</p>
		),
	},
	{
		name: "my cat",
		response: (
			<p>
				There are many <Link href="/pets">pictures of my cat</Link> on this
				website. Too many, some would say. They are wrong.
			</p>
		),
	},
	{
		name: "latest rumors",
		// One is picked at random each time, like NPC rumors in the game
		response: [
			<p key="2002">They say this whole website is styled after a game from 2002. I couldn&apos;t possibly comment.</p>,
			<p key="scrollbars">
				I hear the person who runs this place spent more time on the scrollbars than on the actual content.
				Priorities, I suppose.
			</p>,
			<p key="telvanni">
				Word is there&apos;s a Telvanni wizard in Sadrith Mora handing out <Link href="/fonts">fonts</Link> for
				free. Free! From a Telvanni! Something must be wrong.
			</p>,
			<p key="cliff-racers">Cliff racers. That&apos;s all I&apos;ll say. Cliff racers.</p>,
			<p key="caius">
				Caius Cosades in Balmora is a fine, upstanding agent of the Emperor. Don&apos;t ask about the skooma.
			</p>,
		],
	},
];

export default function ContactPage() {
	return (
		<main className="page">
			<Banner name="tx_banner_hlaalu_01" side="left" />
			<Banner name="tx_de_banner_pawn_01" side="right" />
			<Window title="Katariah" bodyClassName="">
				<Dialogue
					greeting="Pick a topic, outlander. Or don't."
					topics={topics}
				/>
			</Window>
		</main>
	);
}
