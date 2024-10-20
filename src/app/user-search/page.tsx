"use client"; // This line is added to mark the component as a Client Component

import { useState } from "react";
import SearchInput from '../components/SearchInput';
import UserProfile from '../components/UserProfile';
import RepoList from '../components/RepoList';
import Link from "next/link";

export default function UserSearch() {
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError('');
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('User not found');
      const user = await userResponse.json();

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposData = await reposResponse.json();

      setUserData(user);
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRepos = async () => {
    const nextPage = currentPage + 1;
    const reposResponse = await fetch(`https://api.github.com/users/${userData.login}/repos?page=${nextPage}`);
    const reposData = await reposResponse.json();
    setRepos((prev) => [...prev, ...reposData]);
    setCurrentPage(nextPage);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">GitHub User Profile Search</h1>
        
        {/* Search Input */}
        <SearchInput onSubmit={handleSearch} />

        {loading && <p>Loading...</p>}
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
        {repos.length > 0 && <RepoList repos={repos} loadMore={loadMoreRepos} />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link href="/">
          <button className="rounded-full bg-gray-500 text-white py-2 px-4 hover:bg-gray-600 transition duration-200">
            Back to Home
          </button>
        </Link>
      </footer>
    </div>
  );
}
