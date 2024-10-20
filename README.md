# GitHub User Profile Search Application

A simple and responsive application that allows users to search for GitHub profiles and view their repositories. Built using Next.js, TypeScript, and Tailwind CSS, this application integrates with the GitHub API to provide real-time data.

## Features

- **Profile Search**: Users can search for any GitHub user by their username.
- **Profile Display**: Displays user details such as name, avatar, bio, and public repositories.
- **Repository List**: Lists all repositories for the searched user, complete with pagination.
- **Responsive Design**: Adapts seamlessly across various screen sizes, including mobile devices.
- **Pagination**: Implemented pagination for navigating through repository listings with 'Next' and 'Previous' buttons.
- **Error Handling**: Provides user-friendly messages for errors encountered during API requests.
- **Bonus Features**:
  - Dynamic loading state during API requests.
  - Clear instructions and a visually appealing UI.

## Getting Started

To run this application locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AnuOluwatomiwa/Technical-Assessment-for-Frontend-Developer-Internship.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Technical-Assessment-for-Frontend-Developer-Internship
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` to access the application.

### Building for Production

To create a production build, run:

```bash
npm run build
```

This command compiles the application for production usage.

## API Integration

This application interacts with the GitHub API to fetch user data and repositories. The search functionality is powered by the `handleSearch` function, which fetches user profiles based on input and handles errors effectively.

## Troubleshooting

- **404 Errors**: If you encounter any 404 errors while navigating, ensure that your routes are set up correctly in the `src/app` directory.
- **Responsive Issues**: If the application does not render well on smaller screens, check the Tailwind CSS classes used for responsiveness.

## Deployment

The application has been deployed on Vercel. You can access it [here](https://technical-assessment-for-frontend-developer-internship.vercel.app/).

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Your feedback is welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
