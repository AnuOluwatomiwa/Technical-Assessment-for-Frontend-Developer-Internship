"use client"; // This line is added to mark the component as a Client Component (as opposed to the default server-side rendering)

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Welcome to Bamidele&apos;s GitHub User Profile Search</h1>
        <p className="text-lg">Find and view GitHub user profiles easily!</p>
        
        <Link href="/user-search">
          <button className="rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition duration-200">
            Use the App
          </button>
        </Link>

        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}