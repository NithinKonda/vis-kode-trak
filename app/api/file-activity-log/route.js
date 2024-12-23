import clientPromise from "@/app/lib/mongo";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("vsCodeUsageDB");
    const data = await db.collection("file_activity_log").find().toArray();

    // Format data to avoid serialization errors
    const serializedData = data.map((entry) => ({
      ...entry,
      _id: entry._id.toString(), // Convert ObjectId to string
    }));

    return new Response(JSON.stringify(serializedData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
