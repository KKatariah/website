import type { Metadata } from "next";
import ImageGrid, { type GridImage } from "@/components/ImageGrid";
import Panel from "@/components/Panel";
import catLounging from "@/assets/cat_photos/088F5D2B-A565-4AA2-B313-3E3B25F85138_4_5005_c.jpeg";
import catLookingUp from "@/assets/cat_photos/1B432650-F804-4F19-959A-ACFEEE7A6661_4_5005_c.jpeg";
import catSitting from "@/assets/cat_photos/1BEFED63-49EB-4B95-B5C9-FE1B03BA26D5_4_5005_c.jpeg";
import catResting from "@/assets/cat_photos/39D5DA62-2FD8-4004-A773-ED0E103142CC_4_5005_c.jpeg";
import catClosePortrait from "@/assets/cat_photos/481BA1F1-B8BB-4B61-AF6B-1D3FFA23728B_1_105_c.jpeg";
import catPosing from "@/assets/cat_photos/4CE861D2-BD48-4F71-9B14-FE56FB1629F4_4_5005_c.jpeg";
import catGlance from "@/assets/cat_photos/691AD36A-6D19-4277-8FA6-6E7B6F9D8913_1_105_c.jpeg";
import catOnSurface from "@/assets/cat_photos/D18F4E16-8188-4BF0-93A2-84723F66E1EA_4_5005_c.jpeg";
import catRelaxing from "@/assets/cat_photos/F2C5E51A-E02A-474E-BBAC-BE512B6E799A_4_5005_c.jpeg";
import catCurled from "@/assets/cat_photos/0C49C003-18CA-45D9-B4BD-4B8B7C51FDC9_4_5005_c.jpeg";
import catAlert from "@/assets/cat_photos/32D26EA1-2565-471D-AEE9-3EDB2F95F60F_4_5005_c.jpeg";
import catProfile from "@/assets/cat_photos/34937856-5619-4342-8B5D-34E7BD997244_1_105_c.jpeg";
import catStretching from "@/assets/cat_photos/3635BEE2-4654-430A-933E-B367E10F6BE0_4_5005_c.jpeg";
import catLounging2 from "@/assets/cat_photos/65A5FCA9-3930-431E-B4B2-7C16B2F162CD_4_5005_c.jpeg";
import catResting2 from "@/assets/cat_photos/78F05A2E-9DA9-46CC-AAB8-E1557F1386A9_1_105_c.jpeg";
import catGaze from "@/assets/cat_photos/8BA1B89E-B98C-46C6-872F-E1F66A80BC56_4_5005_c.jpeg";
import catSeated from "@/assets/cat_photos/BD169FA6-EC76-4D7B-97A1-BB0A78FC9C96_4_5005_c.jpeg";
import catBrightEyes from "@/assets/cat_photos/C1BF089C-E659-4B56-9F6C-C02A406AFAC2_4_5005_c.jpeg";
import catAttentive from "@/assets/cat_photos/D3E36326-F70A-4C35-AA60-7EE1FD0A4BFA_4_5005_c.jpeg";

export const metadata: Metadata = { title: "My Cat" };

// Static imports let Next.js read each photo's size and generate a blur preview at build time
const catPhotos: GridImage[] = [
	{ src: catLounging, alt: "Cat lounging" },
	{ src: catLookingUp, alt: "Cat looking up" },
	{ src: catSitting, alt: "Cat sitting" },
	{ src: catResting, alt: "Cat resting" },
	{ src: catClosePortrait, alt: "Cat close portrait" },
	{ src: catPosing, alt: "Cat posing" },
	{ src: catGlance, alt: "Cat glance" },
	{ src: catOnSurface, alt: "Cat on surface" },
	{ src: catRelaxing, alt: "Cat relaxing" },
	{ src: catCurled, alt: "Cat curled" },
	{ src: catAlert, alt: "Cat alert" },
	{ src: catProfile, alt: "Cat profile" },
	{ src: catStretching, alt: "Cat stretching" },
	{ src: catLounging2, alt: "Cat lounging 2" },
	{ src: catResting2, alt: "Cat resting 2" },
	{ src: catGaze, alt: "Cat gaze" },
	{ src: catSeated, alt: "Cat seated" },
	{ src: catBrightEyes, alt: "Cat bright eyes" },
	{ src: catAttentive, alt: "Cat attentive" },
];
export default function PetsPage() {
	return (
		<Panel title="Picture of My Cat" banners={["tx_bannerd_tavern_01", "tx_bannerd_danger_01"]}>
			<h1>Hello</h1>
			<p>Picture of my cat.</p>
			<ImageGrid images={catPhotos} />
		</Panel>
	);
}
