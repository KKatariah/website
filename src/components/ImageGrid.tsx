import Image, { type StaticImageData } from "next/image";

export type GridImage = { src: StaticImageData | ""; alt: string };

// Matches the .collage columns: 1 column on phones, 2 on tablets, 3 in the ~860px page window
const SIZES = "(max-width: 480px) 100vw, (max-width: 760px) 50vw, 280px";
// Photos likely to be on screen straight away load first; the rest load as you scroll
const EAGER_COUNT = 3;

/** Masonry collage of bordered images (pets, art). */
export default function ImageGrid({ images }: { images: GridImage[] }) {
	return (
		<div className="collage">
			{images.map((image, i) => (
				<figure key={i} className="collage-item">
					{image.src ? (
						<Image
							src={image.src}
							alt={image.alt}
							sizes={SIZES}
							placeholder="blur"
							preload={i < EAGER_COUNT}
						/>
					) : (
						<div className="collage-placeholder">{image.alt}</div>
					)}
				</figure>
			))}
		</div>
	);
}
