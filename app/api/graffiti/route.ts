import { NextRequest, NextResponse } from "next/server";
import Irys from "@irys/sdk";

// async function generateGraffiti(wordsToWrite: string): Promise<string> {
// // Connect to Irys
// const key = process.env.PRIVATE_KEY;
// const token = "matic";
// const url = "https://node2.irys.xyz";
// const serverIrys = new Irys({
// 	url,
// 	token,
// 	key,
// });
// // Upload image
// try {
// 	const tags = [{ name: "Content-Type", value: "image/png" }];
// 	//@ts-ignore
// 	const receipt = await serverIrys.upload(buffer, { tags });
// 	// console.log("🚀 ~ receipt:", receipt);
// 	console.log(`Image uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
// 	// Return URL to image
// 	return `https://gateway.irys.xyz/${receipt.id}`;
// } catch (error) {
// 	console.error("Error:", error);
// 	return "";
// }
// }

async function getResponse(req: NextRequest): Promise<NextResponse> {
	const searchParams = req.nextUrl.searchParams;
	// Parse our word, or default to "GM" if nothing is given
	const word: string = searchParams.get("word") || "GM";

	return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is your graffiti</title>
    <meta property="fc:frame" content="vNext" />
	
	<meta property="fc:frame:image" content="https://gateway.irys.xyz/I-eKypa-vKnzUnNM6YFdnbci664zMoBZitQn04ParbM" />
	<meta property="fc:frame:input:text" content="public:x2dVQryQru...loCaIEH_bc" />
	<meta property="fc:frame:input:text" content="version:1.0.0" />
	<meta property="fc:frame:input:text" content="id:2RQXLiHrvd...hdaQAP67QE" />
	<meta property="fc:frame:input:text" content="timestamp:1707390869133" />
    <meta property="fc:frame:button:1" content="Open In New Tab" />
    <meta property="fc:frame:button:1:action" content="post_redirect" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
