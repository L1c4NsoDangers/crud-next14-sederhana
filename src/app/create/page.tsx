"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Pagey() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="w-full h-auto mt-6 justify-center items-center flex flex-col">
      <h1>FORM CREATE DATA</h1>
      <form className="w-1/2 flex flex-col mt-6 gap-4" onSubmit={handleSubmit}>
        <h1>Judul :</h1>
        <input
          className="border p-4"
          type="text"
          placeholder="Masukan Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h1>Content :</h1>
        <input
          className="border p-4"
          type="text"
          placeholder="Masukan Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
