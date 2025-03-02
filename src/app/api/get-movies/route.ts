import { API_KEY, BASE_URL } from "@/constants/contants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const page = searchParams.get("page") || "1";

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }
    if (query.length < 3) {
      return NextResponse.json(
        {
          Search: [],
          totalResults: "0",
          Response: "False",
          Error: "Please enter at least 3 characters to search",
        },
        { status: 200 }
      );
    }

    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      query
    )}&page=${page}`;

    const response = await fetch(url);

    const data = await response.json();
    console.log(`OMDB API response:`, data);

    if (data.Response === "False") {
      if (data.Error === "Too many results.") {
        return NextResponse.json(
          {
            Search: [],
            totalResults: "0",
            Response: "False",
            Error:
              "Your search is too broad. Please try a more specific query.",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          Search: [],
          totalResults: "0",
          Response: "False",
          Error: data.Error || "No results found",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      {
        Search: [],
        totalResults: "0",
        Response: "False",
        Error: "Failed to fetch movies. Please try again later.",
      },
      { status: 500 }
    );
  }
}
