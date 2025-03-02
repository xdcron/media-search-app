# M&B (Movies & Books)

## How to Run the Project

1. Clone the repository from GitHub:
   ```sh
   git clone https://github.com/xdcron/media-search-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd media-search-app
   ```
3. Install the necessary dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000` to access the application.

## Assumptions Made

- Internet access is required to fetch movie and book data.
- The application is primarily designed for desktop and mobile users.

## Implemented Features

- **User Authentication**: Users can sign in and sign out using Firebase Authentication.
- **Dark Mode**: Users can toggle between light and dark mode.
- **Search Switch**: Users can switch between searching for movies or books.
- **Infinite Scrolling**: Results are loaded dynamically as the user scrolls.
- **Detailed View**: Clicking on a movie or book displays additional details using a ShadCN sheet.

## Potential Improvements with Additional Time

- **Bookmarking**: Allow signed-in users to save their favorite movies and books.
- **Better UI/UX Enhancements**: Improve animations and transitions for a smoother experience.
- **Additional Media Search types**: Add more forms of media which can be search e.g songs.

## Libraries Used & Why

- **TanStack Query**: Simplifies data fetching and caching, making infinite scrolling easy to implement.
- **ShadCN UI**: Provides aesthetically pleasing and accessible UI components.
- **Firebase**: Handles user authentication securely and efficiently.
- **Lodash**: Used for its debounce function to optimize search queries.
- **Sonner**: Handles toast notifications.
- **Next-Themes**: Manages light and dark mode themes.
