"use server";
import { NextResponse } from "next/server";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

export async function GET(request: Request) {
  const data = { apiEndpoint: DJANGO_API_ENDPOINT };
  return NextResponse.json(data, { status: 200 });
}
