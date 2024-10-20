import React from 'react';

// Define the structure of a single repository
interface Repo {
    id: number; // Change this to number if your API provides numbers
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
}

// Props for the RepoList component, which will receive an array of repos
interface RepoListProps {
    repos: Repo[];
    error?: string;
}

const RepoList: React.FC<RepoListProps> = ({ repos, error }) => {
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (repos.length === 0) {
        return <div>No repositories found.</div>;
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold">Repositories</h3>
            <ul className="space-y-4">
                {repos.map((repo) => (
                    <li key={repo.id} className="border rounded-lg p-4 hover:shadow-lg transition-all">
                        <h4 className="text-md font-semibold">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description || 'No description'}</p>
                        <p className="text-gray-600">Stars: {repo.stargazers_count} | Forks: {repo.forks_count}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepoList;
