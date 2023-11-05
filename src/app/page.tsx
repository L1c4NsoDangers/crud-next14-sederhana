import Item from "./item";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient untuk berinteraksi dengan database melalui Prisma.
import Link from "next/link"; // Import komponen Link dari Next.js untuk menangani navigasi.
import { NextResponse } from "next/server"; // Import NextResponse dari Next.js, meskipun sepertinya tidak digunakan dalam kode ini.
import React from "react"; // Import React untuk membuat komponen React.

const prisma = new PrismaClient(); // Membuat instance PrismaClient untuk berinteraksi dengan database.
// Fungsi ini digunakan untuk mengambil daftar posting dari server melalui API.
const getPosts = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/post", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json;
};

// Komponen AdminGaleryDashboard adalah komponen React yang akan ditampilkan pada halaman admin galeri.
const AdminGaleryDashboard = async () => {
  // Mengambil daftar posting dari server melalui fungsi getPosts yang telah didefinisikan sebelumnya.
  const posts = await getPosts();

  // Mengembalikan tampilan komponen React.
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="w-1/2 flex mt-6">
        <Link className="bg-black text-white p-2 rounded" href="/create">
          Create +
        </Link>
        {/* Membuat tautan ke halaman "create-galery" dalam aplikasi. */}
      </div>
      <div className="mt-6 w-1/2">
        {posts?.posts?.map((post: any, index: number) => (
          // Melooping melalui daftar posting dan menampilkan setiap posting.
          <Item key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AdminGaleryDashboard; // Mengekspor komponen AdminGaleryDashboard untuk digunakan di tempat lain dalam aplikasi.
