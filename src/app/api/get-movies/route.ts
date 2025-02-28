import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = process.env.OMDB_API_URL || "https://www.omdbapi.com";

export async function GET(request: NextRequest) {
  try {
    // Get search query from URL
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const page = searchParams.get("page") || "1";

    // Log the request parameters
    console.log(`Query: ${query}, Page: ${page}`);

    // Return error if no query is provided
    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Minimum query length check to avoid too many results
    if (query.length < 3) {
      return NextResponse.json(
        {
          Search: [],
          totalResults: "0",
          Response: "False",
          Error: "Please enter at least 3 characters to search",
        },
        { status: 200 }
      ); // Use 200 not 404 to handle this gracefully
    }

    // Construct the API URL correctly
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      query
    )}&page=${page}`;

    console.log(`Fetching from: ${url.replace(API_KEY || "", "[REDACTED]")}`);

    // Fetch data from OMDB API
    const response = await fetch(url);

    // Log response status
    console.log(`OMDB API response status: ${response.status}`);

    const data = await response.json();
    console.log(`OMDB API response:`, data);

    // Handle API errors with 200 status code for better client handling
    if (data.Response === "False") {
      // Special handling for "Too many results" error
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

      // Handle other errors
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

    // Return successful response
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
