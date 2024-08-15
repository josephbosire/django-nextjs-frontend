"use client";

import { useAuth } from "@/components/auth/AuthProvider";

import { useEffect } from "react";
import useSWR from "swr";
import { HttpError } from "@/lib/httpError";

const WAITLIST_API_URL = "/api/waitlist/";
const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new HttpError("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const Waitlists = () => {
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);
  const auth = useAuth();

  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequiredRedirect();
    }
  }, [error]);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
};

export default Waitlists;
