import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className="mt-4 inline-block rounded bg-white px-4 py-2 shadow"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
