// app/api/markets/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://ifgames.win/api/v2/events", {
      next: { revalidate: 0 }, // disables caching
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from IG API" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/markets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
