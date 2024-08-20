"use client";

import { columns } from "@/app/waitlists/columns";
import { DataTable } from "@/components/table/DataTable";
import { fetcher } from "@/lib/utils";

import React, { useEffect } from "react";
import useSWR from "swr";
import { useAuth } from "./auth/AuthProvider";
const WAITLIST_API_URL = "/api/waitlist/";
const WaitlistTable = () => {
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);
  const auth = useAuth();

  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequiredRedirect();
    }
  }, [error]);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default WaitlistTable;
