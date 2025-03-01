import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = process.env.OMDB_API_URL || "https://www.omdbapi.com";

export async function POST(request: NextRequest) {
  try {
    // Get movie ID from request body
    const body = await request.json();
    const { id } = body;

    // Log the request parameters
    console.log(`Movie ID: ${id}`);

    // Validate input
    if (!id) {
      return NextResponse.json(
        {
          Response: "False",
          Error: "Movie ID is required",
        },
        { status: 200 } // Using 200 status with error in body like the search API
      );
    }

    // Construct the API URL
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;

    console.log(`Fetching from: ${url.replace(API_KEY || "", "[REDACTED]")}`);

    // Fetch data from OMDB API
    const response = await fetch(url);

    // Log response status
    console.log(`OMDB API response status: ${response.status}`);

    // Handle non-OK responses from the external API
    if (!response.ok) {
      console.error(
        "OMDB API response not OK:",
        response.status,
        response.statusText
      );
      return NextResponse.json(
        {
          Response: "False",
          Error: `API responded with status: ${response.status}`,
        },
        { status: 200 } // Match search API style
      );
    }

    const data = await response.json();
    console.log(`OMDB API response:`, data);

    // Handle API errors with 200 status code for better client handling
    if (data.Response === "False") {
      return NextResponse.json(
        {
          Response: "False",
          Error: data.Error || "Movie not found",
        },
        { status: 200 } // Match search API style
      );
    }

    // Return successful response
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
