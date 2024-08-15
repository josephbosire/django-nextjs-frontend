"use server";
import { NextResponse } from "next/server";
import {
  getToken,
  setToken,
  setRefreshToken,
  getRefreshToken,
} from "@/lib/auth";

const API_LOGIN_URL = "http://localhost:8001/api/token/pair";

export async function POST(request: Request) {
  const currentAuthToken = getToken();
  const currentRefreshToken = getRefreshToken();
  console.log("Current Auth Token", currentAuthToken);
  console.log("Current Refresh Auth Token", currentRefreshToken);
  if (!currentAuthToken) {
    const requestData = await request.json();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };
    const response = await fetch(API_LOGIN_URL, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log("New Access Token:", data);
      setToken(data.access);
      setRefreshToken(data.refresh);
    }
  }
  return NextResponse.json({ message: "hello" }, { status: 200 });
}
