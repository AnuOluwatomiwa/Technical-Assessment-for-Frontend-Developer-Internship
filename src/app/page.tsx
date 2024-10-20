"use client"; // This line is added to mark the component as a Client Component (as opposed to the default server-side rendering)

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchInput from './components/SearchInput';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';

export default function Home() {
  const [userData, setUserData] = useState<any>(null); // State for storing user data
  const [repos, setRepos] = useState<any[]>([]); // State for storing repositories
  const [error, setError] = useState(''); // State for storing error messages
  const [loading, setLoading] = useState(false); // State for loading status
  const [currentPage, setCurrentPage] = useState(1); // State for tracking the current page of repositories

  const handleSearch = async (username: string) => {
    setLoading(true); // Set loading to true while fetching data
    setError(''); // Reset any previous error
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('User not found');
      const user = await userResponse.json();

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?page=${currentPage}`); // Fetch repositories for the current page
      const reposData = await reposResponse.json();

      setUserData(user); // Set user data in state
      setRepos(reposData); // Set repositories data in state
    } catch (err) {
      setError(err.message); // Set error message if there's an error
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Function to load more repositories when called
  const loadMoreRepos = async () => {
    const nextPage = currentPage + 1; // Increment the page number
    try {
      const reposResponse = await fetch(`https://api.github.com/users/${userData?.login}/repos?page=${nextPage}`); // Fetch next page of repositories
      const reposData = await reposResponse.json();

      setRepos((prev) => [...prev, ...reposData]); // Append new repositories to the existing list
      setCurrentPage(nextPage); // Update current page state
    } catch (err) {
      setError('Failed to load more repositories.'); // Set error message if fetching fails
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Welcome to Bamidele&apos;s GitHub User Profile Search</h1>
        <p className="text-lg">Find and view GitHub user profiles easily!</p>
        
        {/* Search Input */}
        <SearchInput onSubmit={handleSearch} />

        {loading && <p>Loading...</p>} {/* Show loading message while fetching data */}
        {error && <p className="text-red-500">{error}</p>} {/* Show error message if any */}
        {userData && (
          <UserProfile 
            avatar={userData.avatar_url} 
            username={userData.login} 
            bio={userData.bio} 
            location={userData.location} 
            publicRepos={userData.public_repos} 
          />
        )}
        {repos.length > 0 && (
          <>
            <RepoList repos={repos} loadMore={loadMoreRepos} /> {/* Pass loadMore function to RepoList */}
            <button 
              onClick={loadMoreRepos} 
              className="mt-4 rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition duration-200"
            >
              Load More Repositories
            </button>
          </>
        )}

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
