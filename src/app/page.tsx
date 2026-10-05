import Link from "next/link";
import Banner from "@/components/Banner";
import MapNav from "@/components/MapNav";
import Window from "@/components/Window";
import Frame from "@/components/ui/Frame";

export default function HomePage() {
	return (
		<main className="page wide">
			<Banner name="tx_bannerd_welcome_01" side="left" />
			<Banner name="tx_bannerd_tavern_01" side="right" />
			<div className="home-grid">
				<Window title="Katariah">
					<div className="home-intro">
						{/* eslint-disable-next-line @next/next/no-img-element -- framed avatar */}
						<img src="/ginger.jpeg" alt="Avatar" className="home-avatar" />
						<div>
							<h1>Katariah&apos;s Morrowind Website</h1>
							<p className="muted">Welcome to ma website</p>
						</div>
					</div>
					<Frame>
						<h2>About Me</h2>
						<p>
							Hi, I&apos;m Katariah (Ari). I make things: <Link href="/fonts">fonts</Link>,{" "}
							art and fashion, and a{" "}
							<a href="https://kkatariah.com/">Minecolonies planner</a>.
						</p>
						<p>
							I also have a <Link href="/pets">very photogenic cat</Link> and a deep love for the hit 2002
							Bethesda game The Elder Scrolls III: Morrowind, which is why this website looks like this.
						</p>
						<p>
							Want to say hi? Find me in the <Link href="/contact">dialogue window</Link>.
						</p>
					</Frame>
				</Window>
				<Window title="Vvardenfell">
					<MapNav />
				</Window>
			</div>
		</main>
	);
}
