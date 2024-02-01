"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button className="rounded bg-white px-4 py-2" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
