# Star Wars Character Search App

## Description
This React application fetches and displays information about Star Wars characters using the Star Wars API (SWAPI). Users can search for characters by name, and the results are displayed in a table format with pagination.

## Setup Instructions
To run this project locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
2. Install dependencies: Make sure you have Node.js installed, then run:
  npm install
3. Start the application:
   npm start
4. Open your browser and navigate to http://localhost:3000 to view the application.


## Features
1. Search Functionality: Users can search for characters using the input field, and results will update automatically without needing a search button.
2. Pagination: Users can navigate through pages of results with Previous and Next buttons.

## Issues Faced
1. API Rate Limiting: Encountered issues with rate limiting while testing. Implemented error handling to manage failed requests gracefully.
2. Data Pagination: Initially struggled with correctly implementing pagination based on the total number of results. Adjusted calculations based on API response.
   
## Constructive Feedback for Improvement
1. Enhance UI/UX: Implement a more polished design using a UI framework like Material-UI or Bootstrap for better aesthetics and usability.
2. Unit Tests: Add unit tests to validate the components and API responses, ensuring reliability during future updates.
3. Loading State: Consider adding animations or spinners for better feedback during loading states to improve user experience.

## Conclusion
This project showcases how to work with APIs in React, manage state and side effects using hooks, and implement user-friendly features like searching and pagination. The feedback and issues encountered provide a foundation for future improvements and learning.