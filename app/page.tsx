import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
	buttons: [
		{
			label: "Begin",
		},
	],
	image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/llama-graffiti.png`,
	post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graffiti?word=yoyoyo`,
	// input: {
	// 	text: "Graffiit it up",
	// },
});

export const metadata: Metadata = {
	title: "Llama graffiti artist",
	description: "Llama paints the night, Eternal data in art, Walls whisper always.",
	openGraph: {
		title: "Llamas make the best artists",
		description: "Llama paints the night, Eternal data in art, Walls whisper always.",
		// images: [`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/Qme4FXhoxHHfyzTfRxSpASbMF8kajLEPkRQWhwWu9pkUjm/0.png`],
	},
	other: {
		...frameMetadata,
	},
};

export default function Page() {
	return (
		<>
			<h1>Llama paints the night, Eternal data in art, Walls whisper always.</h1>
		</>
	);
}
