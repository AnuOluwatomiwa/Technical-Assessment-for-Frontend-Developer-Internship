"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-gray-900 dark:text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        {/* Animated Welcome heading */}
        <motion.div
          className="flex flex-col items-center sm:items-start"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Taller and slimmer 'Welcome' */}
          <h1 className="text-7xl font-black tracking-tight dark:text-white" style={{ lineHeight: '1.2' }}>
            Welcome
          </h1>

          {/* Small 'to' */}
          <p className="text-xl font-light dark:text-gray-300">
            to
          </p>

          {/* Bamidele's (Cursive, reduced thickness) */}
          <h2 className="text-[60px] font-medium italic dark:text-white" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Bamidele's
          </h2>

          {/* Slimmer 'User Profile Search' */}
          <p className="text-3xl font-light dark:text-gray-100">
            <span style={{ fontFamily: "'Roboto Mono', monospace", fontWeight: 600 }}>GitHub</span>{" "}
            <span className="font-serif" style={{ fontWeight: 300 }}>User Profile Search</span>
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/user-search">
            <button className="rounded-full bg-blue-600 text-white py-2 px-6 text-lg font-semibold hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600">
              Use the App
            </button>
          </Link>
        </motion.div>

        {/* Powered by Next.js next to the logo */}
        <div className="flex items-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">
            Powered by
          </p>
          <Image
            className="dark:invert"
            src="https://nextjs.org/icons/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
