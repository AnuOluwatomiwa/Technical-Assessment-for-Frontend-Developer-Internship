"use client"; // This line is added to mark the component as a Client Component (as opposed to the default server-side rendering)

import Head from 'next/head';
import { useState } from 'react';
import SearchInput from '../components/SearchInput';

// Interface for GitHub user data fetched from the API
interface GitHubUser {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    public_repos: number;
}

const Home: React.FC = () => {
    const [user, setUser] = useState<GitHubUser | null>(null); // State for storing user data
    const [error, setError] = useState<string | null>(null); // State for handling errors

    // Fetch user data from GitHub API based on the provided username
    const handleSearch = async (username: string) => {
        // Fetch data from the GitHub API
        try {
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (!res.ok) {
                throw new Error('User not found');
            }
            const data: GitHubUser = await res.json();
            setUser(data); // Update user state with the fetched data
            setError(null); // Clear any existing errors
        } catch (err) {
            // Type checking to safely access error.message
            if (err instanceof Error) {
                setError(err.message); // Safely access the error message
            } else {
                setError('Something went wrong'); // Fallback for unknown error types
            }
            setUser(null); // Clear user state if an error occurs
        }
    };

    return (
        <div>
            <Head>
                <title>GitHub User Search</title>
                <meta name="description" content="GitHub user profile search app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">GitHub User Profile Search</h1>
                <SearchInput onSubmit={handleSearch} /> {/* Input component for search */}

                {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error if any */}

                {user && (
                    <div className="mt-4">
                        <img src={user.avatar_url} alt="Avatar" className="rounded-full h-20 w-20 mb-2" /> {/* User's avatar */}
                        <h2 className="text-xl font-semibold">{user.name}</h2> {/* User's name */}
                        <p className="text-gray-600">{user.bio}</p> {/* User's bio */}
                        <p className="mt-2">
                            Location: {user.location || 'Not specified'} {/* User's location */}
                        </p>
                        <p className="mt-1">
                            Public Repositories: {user.public_repos} {/* User's public repos */}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
