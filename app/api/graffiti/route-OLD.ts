// import { NextRequest, NextResponse } from "next/server";
// import { createCanvas, registerFont, loadImage } from "node-canvas";
// import Irys from "@irys/sdk";
// import path from "path";

// async function generateGraffiti(wordsToWrite: string): Promise<string> {
// 	// Define canvas size and aspect ratio
// 	const width = 1024;
// 	const height = Math.round(width / 1.91);
// 	const canvas = createCanvas(width, height);
// 	const context = canvas.getContext("2d");

// 	// Set background color
// 	context.fillStyle = "#000000"; // black background
// 	context.fillRect(0, 0, width, height);

// 	const fontPath = path.join(process.cwd(), "./public/fonts/", "DonGraffiti.otf");
// 	registerFont(fontPath, { family: "DonGraffiti" });
// 	context.font = '100px "DonGraffiti"';
// 	context.textAlign = "center";
// 	context.textBaseline = "middle";

// 	// Color palette
// 	const neonColors = ["#ff00ff", "#00ffff", "#ffff00", "#ff0000", "#00ff00"];

// 	// Split text to color each character
// 	const chars = wordsToWrite.split("");
// 	const xOffset = width / chars.length;

// 	chars.forEach((char, index) => {
// 		// Apply color for each character
// 		const color = neonColors[Math.floor(Math.random() * neonColors.length)];
// 		context.fillStyle = color;
// 		context.fillText(char, xOffset * index + xOffset / 2, height / 2);
// 	});

// 	// Convert canvas to Buffer
// 	const buffer = canvas.toBuffer("image/png");

// 	// Connect to Irys
// 	const key = process.env.PRIVATE_KEY;
// 	const token = "matic";
// 	const url = "https://node2.irys.xyz";
// 	const serverIrys = new Irys({
// 		url,
// 		token,
// 		key,
// 	});

// 	// Upload image
// 	try {
// 		const tags = [{ name: "Content-Type", value: "image/png" }];
// 		//@ts-ignore
// 		const receipt = await serverIrys.upload(buffer, { tags });
// 		// console.log("🚀 ~ receipt:", receipt);
// 		console.log(`Image uploaded ==> https://gateway.irys.xyz/${receipt.id}`);

// 		// Return URL to image
// 		return `https://gateway.irys.xyz/${receipt.id}`;
// 	} catch (error) {
// 		console.error("Error:", error);
// 		return "";
// 	}
// }

// async function getResponse(req: NextRequest): Promise<NextResponse> {
// 	const searchParams = req.nextUrl.searchParams;
// 	// Parse our word, or default to "GM" if nothing is given
// 	const word: string = searchParams.get("word") || "GM";
// 	const graffitiURL = await generateGraffiti(word);

// 	return new NextResponse(`<!DOCTYPE html><html><head>
//     <title>This is your graffiti</title>
//     <meta property="fc:frame" content="vNext" />
//     <meta property="fc:frame:image" content="${graffitiURL}" />
//     <meta property="fc:frame:button:1" content="Open In New Tab" />
//     <meta property="fc:frame:button:1:action" content="post_redirect" />
//   </head></html>`);
// }

// export async function POST(req: NextRequest): Promise<Response> {
// 	return getResponse(req);
// }

// export const dynamic = "force-dynamic";
