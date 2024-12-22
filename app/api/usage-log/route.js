import clientPromise from "@/app/lib/mongo";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("vsCodeUsageDB");
    const data = await db.collection("usage_log").find().toArray();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
