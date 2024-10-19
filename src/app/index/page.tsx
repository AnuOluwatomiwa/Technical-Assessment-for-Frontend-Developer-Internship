"use client"; // This line is added to mark the component as a Client Component(aas opposed to the default server state)

import Head from 'next/head';
import { useState } from 'react';
import SearchInput from '../components/SearchInput';

const Home: React.FC = () => {
    const [user, setUser] = useState<any>(null); // State for the storing of user data
    const [error, setError] = useState<string | null>(null); // This is for handling errors

    // Fetch user data from Github API, on the basis of username provided
    const handleSearch = async (username: string) => {
        // Fetch data from the GitHub API
        try {
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (!res.ok) {
                throw new Error('User not found');
            }
            const data = await res.json();
            setUser(data);
            setError(null);
        } catch (err) {
            // Type checking to safely access error.message
            if (err instanceof Error) {
                setError(err.message); // Safely access the error message
            } else {
                setError('Something went wrong'); // Fallback for unknown error types
            }
            setUser(null);
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
                <SearchInput onSubmit={handleSearch} />

                {error && <p className="text-red-500 mt-2">{error}</p>}

                {user && (
                    <div className="mt-4">
                        <img src={user.avatar_url} alt="Avatar" className="rounded-full h-20 w-20 mb-2" />
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.bio}</p>
                        <p className="mt-2">
                            Location: {user.location || 'Not specified'}
                        </p>
                        <p className="mt-1">
                            Public Repositories: {user.public_repos}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
