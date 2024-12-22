import clientPromise from "@/app/lib/mongo";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("vsCodeUsageDB");


    const data = await db.collection("usage_log").aggregate([
      {
        $group: {
          _id: "$date",
          totalDuration: { $sum: "$duration_seconds" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]).toArray();


    const formattedData = data.map(({ _id, totalDuration }) => ({
      date: _id,
      totalDuration,
    }));

    return new Response(JSON.stringify(formattedData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
