import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import Irys from "@irys/sdk";
import path from "path";

async function generateGraffiti(wordsToWrite: string): Promise<string> {
	// Launch puppeteer browser
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Generate HTML content for graffiti
	const html = `<html><body><div style="font-family: 'DonGraffiti'; background-color: black; color: white; width: 1024px; height: 536px; display: flex; justify-content: center; align-items: center;">${wordsToWrite}</div></body></html>`;

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
