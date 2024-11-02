export function normalizeUrl(inputUrl: string): string {
  try {
    // If the URL doesn't have a scheme, add "https://"
    if (!/^https?:\/\//i.test(inputUrl)) {
      inputUrl = `https://${inputUrl}`;
    }

    const url = new URL(inputUrl);

    // If the hostname does not start with "www", prepend it
    if (!url.hostname.startsWith("www.")) {
      url.hostname = `www.${url.hostname}`;
    }

    return url.toString();
  } catch (error) {
    // Return null if the input is not a valid URL
    console.error("Invalid URL format:", error);
    return "";
  }
}
