"use server";
import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";

const API_WAITLIST_URL = `${DJANGO_API_ENDPOINT}/waitlist/`;

type Headers = {
  "Content-Type": string;
  Accept: string;
  Authorization?: string;
};

export async function GET(request: Request) {
  const { data, status } = await ApiProxy.get(API_WAITLIST_URL, true);
  return NextResponse.json(data, { status: status });
}

export async function POST(request: Request) {
  const requestData = await request.json();
  const { data, status } = await ApiProxy.post(
    API_WAITLIST_URL,
    requestData,
    true
  );
  return NextResponse.json(data, { status: status });
}
