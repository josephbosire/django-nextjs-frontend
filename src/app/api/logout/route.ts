"use server";
import { deleteTokens } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const deletedResponse = deleteTokens();
  return NextResponse.json({ message: "Logout Successful" }, { status: 200 });
}
