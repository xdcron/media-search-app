import { API_KEY, BASE_URL } from "@/constants/contants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          Response: "False",
          Error: "Movie ID is required",
        },
        { status: 200 }
      );
    }

    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
    const response = await fetch(url);

    console.log(` response status: ${response.status}`);
    if (!response.ok) {
      console.error(" response not OK:", response.status, response.statusText);
      return NextResponse.json(
        {
          Response: "False",
          Error: `API responded with status: ${response.status}`,
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    console.log(` response:`, data);

    if (data.Response === "False") {
      return NextResponse.json(
        {
          Response: "False",
          Error: data.Error || "Movie not found",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return NextResponse.json(
      {
        Response: "False",
        Error: "Failed to fetch movie details. Please try again later.",
      },
      { status: 500 }
    );
  }
}
