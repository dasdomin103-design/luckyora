// app/ads/route.ts

export const dynamic = "force-static";

export async function GET() {
  return new Response(
    "google.com, pub-3750799809258319, DIRECT, f08c47fec0942fa0",
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}

// 👇 Ensures TypeScript treats this as a module (fixes your build error)
export {};