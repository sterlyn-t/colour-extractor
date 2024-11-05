import { NextRequest, NextResponse } from "next/server";
import Vibrant from "node-vibrant";
import chromium from "chrome-aws-lambda";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    // const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Take a screenshot and store it as a Buffer
    const screenshotBuffer = await page.screenshot({ type: "png" });
    await browser.close();

    if (!screenshotBuffer) {
      return NextResponse.json(
        { error: "Failed to capture screenshot" },
        { status: 500 }
      );
    }

    // Convert the Uint8Array to Buffer if needed
    // const buffer = Buffer.from(screenshotBuffer);

    // Use Vibrant to extract colors directly from the screenshot buffer
    const palette = await Vibrant.from(screenshotBuffer).getPalette();

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
