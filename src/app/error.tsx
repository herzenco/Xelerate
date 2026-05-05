"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <button
        onClick={reset}
        className="rounded-full bg-primary px-6 py-3 text-white hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
