export type BannerName =
	| "tx_bannerd_welcome_01"
	| "tx_bannerd_clothing_01"
	| "tx_bannerd_tavern_01"
	| "tx_bannerd_goods_01"
	| "tx_bannerd_alchemy_01"
	| "tx_bannerd_danger_01"
	| "tx_de_banner_book_01"
	| "tx_de_banner_pawn_01"
	| "tx_de_banner_telvani_01"
	| "tx_banner_hlaalu_01"
	| "tx_banner_redoran_01"
	| "tx_banner_temple_01";

export default function Banner({ name, side }: { name: BannerName; side: "left" | "right" }) {
	// eslint-disable-next-line @next/next/no-img-element -- decorative pixel texture
	return <img src={`/menu/banner/${name}.png`} alt="" aria-hidden className={`banner ${side}`} />;
}
