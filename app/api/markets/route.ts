export async function GET() {
  const igRes = await fetch("https://ifgames.win/api/v2/events");
  const igData = await igRes.json();
  if (!Array.isArray(igData)) {
    console.error("Unexpected response format: igData is not an array", igData);
    return new Response(JSON.stringify({ error: "Invalid data format" }), { status: 500 });
  }

  // Dummy PM data for now
  const pmData = igData.map((m: any) => ({
    id: m.id,
    title: m.title,
    ig_prob: m.probability * 100,
    pm_prob: m.probability * 100 + (Math.random() * 10 - 5), // Simulated delta
    delta: m.probability * 100 + (Math.random() * 10 - 5) - m.probability * 100,
  }));

  console.log("IG API Data",igData);

  return new Response(JSON.stringify({ markets: pmData }), { status: 200 });
}
