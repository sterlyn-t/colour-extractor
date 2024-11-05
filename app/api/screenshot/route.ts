import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";
import Vibrant from "node-vibrant";
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    let browser;
    if (process.env.NODE_ENV === "production") {
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      browser = await puppeteer.launch({ headless: true });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: "networkidle0" });

    // Take a screenshot and store it as a Buffer
    const screenshotBuffer = await page.screenshot({
      type: "png",
      omitBackground: false,
    });
    await browser.close();

    if (!screenshotBuffer) {
      return NextResponse.json(
        { error: "Failed to capture screenshot" },
        { status: 500 }
      );
    }

    // Convert the Uint8Array to Buffer if needed
    const buffer = Buffer.from(screenshotBuffer);

    // Use Vibrant to extract colors directly from the screenshot buffer
    const palette = await Vibrant.from(buffer).getPalette();

    // Map palette to RGB color values
    const colors = Object.values(palette).map(
      (swatch) => swatch?.rgb ?? [0, 0, 0]
    );

    return NextResponse.json({ colors }, { status: 200 });
  } catch (error) {
    console.error("Error capturing screenshot or extracting colors:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
