import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div tw="bg-blue-600 w-full text-8xl h-full text-white flex items-center justify-center">
        <div>Headlines</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
