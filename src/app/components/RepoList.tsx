import React from 'react';

// Define the structure of a single repository
interface Repo {
    id: string; // The Unique identifier for the repository
    name: string; // Repository's name
    html_url: string; // URL leading to the repository on GitHub
    description: string | null; // Description of the repository
    stargazers_count: number; // Amount of stars the repository has ever received
    forks_count: number; // Number of times said repository has been forked
}

// Props for the RepoList component, which will receive an array of repos
interface RepoListProps {
    repos: Repo[]; // Array of repositories
    error?: string; // Optional error message to display
}

// RepoList component for displaying a list of repositories
const RepoList: React.FC<RepoListProps> = ({ repos, error }) => {
    // If there's an error, display the error message
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    // If there are no repositories, this will display a friendly message
    if (repos.length === 0) {
        return <div>No repositories found.</div>;
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold">Repositories</h3>
            <ul className="space-y-4">
                {/* Map through the repos array and display each repository's information */}
                {repos.map(repo => (
                    <li key={repo.id} className="border rounded-lg p-4">
                        <h4 className="text-md font-semibold">
                            {/* Link to the repository on GitHub */}
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {repo.name}
                            </a>
                        </h4>
                        {/* Shows the repository description or a default message if none exists */}
                        <p>{repo.description || 'No description'}</p>
                        {/* Display of star and fork counts */}
                        <p className="text-gray-600">Stars: {repo.stargazers_count} | Forks: {repo.forks_count}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepoList;
