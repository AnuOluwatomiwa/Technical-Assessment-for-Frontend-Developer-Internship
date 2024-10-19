"use client"; // This line is added to mark the component as a Client Component(aas opposed to the default server state)

import { useState } from 'react';

const SearchInput: React.FC<{ onSubmit: (username: string) => void }> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(username);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                value={username}
                onChange={handleChange}
                placeholder="Enter GitHub username"
                className="border rounded-lg px-4 py-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 block w-full">
                Search
            </button>
        </form>
    );
};

export default SearchInput;


