"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";

const LOGOUT_URL = "/api/logout/";

const Logout = () => {
  const auth = useAuth();
  const handleLogout = async (event) => {
    const requestOptions = {
      method: "POST",
    };
    const response = await fetch(LOGOUT_URL, requestOptions);
    const data = await response.json();
    if (response.ok) {
      console.log("Logged out");
      auth.logout();
    }
  };

  return (
    <div className="h-[95vh] flex flex-col items-center">
      <div className="max-w-md mx-auto py-5">
        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white hover:bg-red-300 px-3 py-2"
        >
          Yes, Logout
        </Button>
      </div>
    </div>
  );
};

export default Logout;
