import { ImageResponse } from "next/og";

// Image metadata
export const alt = "News Headlines";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const metadata = {
  metadataBase: new URL("https://rajat-headlines.vercel.app/"),
};

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="bg-blue-600 w-full text-8xl h-full text-white flex items-center justify-center">
        <div>Headlines</div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
