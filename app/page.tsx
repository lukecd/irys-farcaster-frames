import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
	buttons: [
		{
			label: "Love pineapple on pizza!",
		},
		{
			label: "No way, no how.",
		},
	],
	image: `${process.env.NEXT_PUBLIC_BASE_URL}/the-battle.png`,
});

export const metadata: Metadata = {
	title: "Pineapple on pizza",
	description: "Help us decide, pineapple on pizza? Yah or Nay?",
	openGraph: {
		title: "Pineapple on pizza",
		description: "Help us decide, pineapple on pizza? Yah or Nay?",
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
