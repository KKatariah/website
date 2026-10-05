import Banner, { type BannerName } from "./Banner";
import Window from "./Window";

/** A content page: one centred window, with shop-sign banners hanging either side on wide screens. */
export default function Panel({
	title,
	banners,
	children,
}: {
	title: string;
	banners?: [left: BannerName, right: BannerName];
	children: React.ReactNode;
}) {
	return (
		<main className="page">
			{banners && (
				<>
					<Banner name={banners[0]} side="left" />
					<Banner name={banners[1]} side="right" />
				</>
			)}
			<Window title={title}>{children}</Window>
		</main>
	);
}
