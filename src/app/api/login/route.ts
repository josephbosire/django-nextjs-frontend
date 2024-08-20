"use server";
import { NextResponse } from "next/server";
import {
  getToken,
  setToken,
  setRefreshToken,
  getRefreshToken,
} from "@/lib/auth";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

const API_LOGIN_URL = `${DJANGO_API_ENDPOINT}/api/token/pair`;

export async function POST(request: Request) {
  const currentAuthToken = getToken();
  const currentRefreshToken = getRefreshToken();
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
      setToken(data.access);
      setRefreshToken(data.refresh);
      return NextResponse.json(
        { username: data.username, loggedIn: true },
        { status: 200 }
      );
    }
  }
  return NextResponse.json(
    { message: "Login failed", loggedIn: false },
    { status: 400 }
  );
}
