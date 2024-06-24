"use client";
import React, { useState } from "react";
import { logout } from "@actions";
import { useRouter } from "next/navigation";

const Logout = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const result = await logout({ error: undefined });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/recipes"); 
      }
    } catch (error) {
      console.error("Logout Error:", error);
      setError("An error occurred during logout.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-5">
      <button 
        onClick={handleClick} 
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Logout;
