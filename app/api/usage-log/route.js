import clientPromise from "@/app/lib/mongo";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("vsCodeUsageDB");

    const data = await db
      .collection("usage_log")
      .aggregate([
        {
          $group: {
            _id: "$date",
            totalDuration: { $sum: "$duration_seconds" },
            docs: { $push: "$$ROOT" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
      .toArray();

    // Filter out duplicates with very similar durations
    const filteredData = data.map((group) => {
      const uniqueDocs = [];
      group.docs.forEach((doc) => {
        const isDuplicate = uniqueDocs.some(
          (uniqueDoc) =>
            Math.abs(uniqueDoc.duration_seconds - doc.duration_seconds) <= 1
        );
        if (!isDuplicate) {
          uniqueDocs.push(doc);
        }
      });
      return {
        date: group._id,
        totalDuration: uniqueDocs.reduce(
          (sum, doc) => sum + doc.duration_seconds,
          0
        ),
      };
    });

    return new Response(JSON.stringify(filteredData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
