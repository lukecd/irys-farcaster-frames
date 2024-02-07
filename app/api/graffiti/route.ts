import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import Irys from "@irys/sdk";
import path from "path";

async function generateGraffiti(wordsToWrite: string): Promise<string> {
	// Launch puppeteer browser
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const neonColors = ["#ff00ff", "#00ffff", "#ffff00", "#ff0000", "#00ff00"];
	const width = 600;
	const height = Math.round(width / 1.91); // Compute height based on aspect ratio

	// Generate spans for each letter with different neon colors
	const coloredWords = wordsToWrite
		.split("")
		.map((char) => {
			const color = neonColors[Math.floor(Math.random() * neonColors.length)];
			return `<span style="color:${color};">${char}</span>`;
		})
		.join("");

	const fontSize = "100px";

	const html = `
	<html>
	<head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Honk&display=swap" rel="stylesheet">
	  <style>
		body, html {
		  margin: 0;
		  padding: 0;
		  overflow: hidden; 
		  height: 100%; 
		}
		#graffiti {
		  position: absolute; /* Positions the div at the top-left corner */
		  top: 0;
		  left: 0;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  width: ${width}px;
		  height: ${height}px;
		  background-color: black;
		  font-size: ${fontSize};
		  font-family: "Honk", system-ui;
		  font-optical-sizing: auto;
			font-weight: 400;
			font-style: normal;
			font-variation-settings:
				"MORF" 15,
				"SHLN" 50;
		  color: white;
		  flex-wrap: wrap;
		}
	  </style>

	  </head>
	<body>
	  <div id="graffiti">
		${coloredWords}
	  </div>
	</body>
	</html>`;

	// Set the page dimensions
	await page.setViewport({ width: width, height: height });

	// Set page content to your generated HTML
	await page.setContent(html);

	// Take a screenshot
	const buffer = await page.screenshot({ type: "png" });

	// Connect to Irys
	const key = process.env.PRIVATE_KEY;
	const token = "matic";
	const url = "https://node2.irys.xyz";
	const serverIrys = new Irys({
		url,
		token,
		key,
	});

	// Upload image
	try {
		const tags = [{ name: "Content-Type", value: "image/png" }];
		//@ts-ignore
		const receipt = await serverIrys.upload(buffer, { tags });
		// console.log("🚀 ~ receipt:", receipt);
		console.log(`Image uploaded ==> https://gateway.irys.xyz/${receipt.id}`);

		// Return URL to image
		return `https://gateway.irys.xyz/${receipt.id}`;
	} catch (error) {
		console.error("Error:", error);
		return "";
	}
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
	const searchParams = req.nextUrl.searchParams;
	// Parse our word, or default to "GM" if nothing is given
	const word: string = searchParams.get("word") || "GM";
	const graffitiURL = await generateGraffiti(word);

	return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is your graffiti</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${graffitiURL}" />
    <meta property="fc:frame:button:1" content="Open In New Tab" />
    <meta property="fc:frame:button:1:action" content="post_redirect" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
