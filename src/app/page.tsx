import Item from "./item";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React from "react";

const prisma = new PrismaClient();

const AdminGaleryDashboard = async () => {
  const getPosts = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/post`);
    const json = await res.json();
    return json;
  };

  const posts = await getPosts();

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="w-1/2 flex mt-6">
        <Link href="/create">
          <a className="bg-black text-white p-2 rounded">Create +</a>
        </Link>
      </div>
      <div className="mt-6 w-1/2">
        {posts?.posts?.map(
          (
            post: {
              id: number;
              title: string;
              content: string | null;
              published: boolean;
            },
            index: React.Key | null | undefined
          ) => (
            <Item key={index} post={post} />
          )
        )}
      </div>
    </div>
  );
};

export default AdminGaleryDashboard;
