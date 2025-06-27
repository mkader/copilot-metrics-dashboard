"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      document.cookie = "auth=true; path=/";
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="space-y-4 bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-900">Login</h2>

        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </main>
  );
}
