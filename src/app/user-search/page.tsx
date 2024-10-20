"use client"; // This line is added to mark the component as a Client Component

import { useState } from "react";
import SearchInput from '../components/SearchInput';
import UserProfile from '../components/UserProfile';
import RepoList from '../components/RepoList';
import Link from "next/link";
import { motion } from "framer-motion"; // Importing framer-motion for animations

export default function UserSearch() {
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreRepos, setHasMoreRepos] = useState(false); // To track if there are more repos
  const [totalPages, setTotalPages] = useState(0); // To track total number of pages

  const reposPerPage = 30;

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError('');
    setRepos([]); // Reset repositories when searching for a new user
    setCurrentPage(1); // Reset pagination
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('User not found');
      const user = await userResponse.json();

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?page=1&per_page=${reposPerPage}`);
      const reposData = await reposResponse.json();

      setUserData(user);
      setRepos(reposData);
      setHasMoreRepos(reposData.length === reposPerPage); // If exactly 30 repos, there might be more
      setTotalPages(Math.ceil(user.public_repos / reposPerPage)); // Calculate total pages
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRepos = async () => {
    const nextPage = currentPage + 1;
    try {
      const reposResponse = await fetch(`https://api.github.com/users/${userData.login}/repos?page=${nextPage}&per_page=${reposPerPage}`);
      const reposData = await reposResponse.json();
      setRepos((prev) => [...prev, ...reposData]);
      setCurrentPage(nextPage);
      setHasMoreRepos(reposData.length === reposPerPage); // Check if there are still more repos
    } catch (err) {
      setError(err.message);
    }
  };

  const goToPage = async (page: number) => {
    try {
      const reposResponse = await fetch(`https://api.github.com/users/${userData.login}/repos?page=${page}&per_page=${reposPerPage}`);
      const reposData = await reposResponse.json();
      setRepos(reposData);
      setCurrentPage(page);
      setHasMoreRepos(reposData.length === reposPerPage);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-gray-900 dark:text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Animated heading for the User Profile Search */}
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          GitHub User Profile Search
        </motion.h1>

        {/* Search Input */}
        <SearchInput onSubmit={handleSearch} />

        {loading && <p className="text-xl font-light dark:text-gray-300">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
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
            <RepoList repos={repos} />
            <div className="mt-4 flex items-center space-x-4">
              {currentPage > 1 && (
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Previous
                </button>
              )}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    className={`py-2 px-4 rounded ${
                      currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                    } hover:bg-gray-300`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              {currentPage < totalPages && (
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  disabled={currentPage === totalPages} // Disable Next button on the last page
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link href="/">
          <button className="rounded-full bg-gray-500 text-white py-2 px-4 hover:bg-gray-600 transition duration-200 dark:bg-gray-400 dark:hover:bg-gray-500">
            Back to Home
          </button>
        </Link>
      </footer>
    </div>
  );
}
