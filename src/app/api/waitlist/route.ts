"use server";
import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const API_WAITLIST_URL = "http://localhost:8001/api/waitlist";

export async function GET(request: Request) {
  console.log("Getting waitlists");
  const authToken = getToken();
  if (!authToken) {
    console.log("No token found");
    return NextResponse.json({ error: "No Tokens" }, { status: 401 });
  }
  console.log("Auth Token:", authToken);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const response = await fetch(API_WAITLIST_URL, options);
  console.log("Response:", response);
  const result = await response.json();
  console.log("Waitlist Response:", result);
  return NextResponse.json({ ...result }, { status: response.status });
}
