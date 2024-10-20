import React from 'react';

interface UserProfileProps {
    avatar: string;
    username: string;
    bio: string | null;
    location: string | null;
    publicRepos: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ avatar, username, bio, location, publicRepos }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center mt-6">
            <img src={avatar} alt={`${username}'s avatar`} className="w-24 h-24 rounded-full" />
            <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 text-center sm:text-left">
                <h2 className="text-xl font-bold">{username}</h2>
                <p className="text-gray-600">{bio || 'No bio available'}</p>
                <p className="text-gray-600">{location || 'Location not specified'}</p>
                <p className="text-gray-600">Public Repositories: {publicRepos}</p>
            </div>
        </div>

    );
};

export default UserProfile;
