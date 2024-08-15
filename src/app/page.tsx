"use client";
import { useAuth } from "@/components/auth/AuthProvider";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import useSWR from "swr";

const fetcher = async (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Home() {
  const auth = useAuth();
  console.log(auth);
  // ONLY use useSWR for GET requests
  const { data, error, isLoading } = useSWR(
    "http://localhost:8001/api/hello",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ModeToggle />
      </div>
      <div>
        {auth.isAuthenticated ? "Hello User" : "Hello Guest, Please login"}
      </div>
    </main>
  );
}
