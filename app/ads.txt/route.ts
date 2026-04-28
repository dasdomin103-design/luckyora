export async function GET() {
  return new Response(
    "google.com, pub-3750799809258319, DIRECT, f08c47fec0942fa0",
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
