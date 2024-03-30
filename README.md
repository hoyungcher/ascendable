# Ascendable
Ascendable is a progression-focused logbook app designed specifically for paragliding pilots. It offers an innovative way to automatically track your flights, monitor your progression, and achieve milestones in your paragliding journey. With Ascendable, pilots can easily upload their flight logs, view detailed statistics about each flight, and see how they are advancing towards their flying goals and achievements.

## Features
- Automatic Flight Log Tracking: Upload your IGC files, and let Ascendable do the rest, parsing your flights and storing them efficiently.
- Progress Tracking: View your progress over time, with detailed stats on your flights, including distance flown, altitude gained, and much more.
- Achievement System: Unlock achievements as you reach new milestones in your paragliding career, motivating you to push your boundaries.

## Repository Structure
This repository is organized into two main directories:

app/: Contains the full-stack application built with Next.js. This directory houses both the frontend and the backend of Ascendable, offering a seamless user experience and interface for pilots to interact with their flight data. The app uses MongoDB for data storage, ensuring high performance and scalability.

flight-stats/: Contains Python AWS Lambda functions responsible for the heavy lifting of parsing IGC files and calculating various flight statistics. These serverless functions allow for efficient processing of flight data, enabling pilots to get quick insights into their flight performance.

## Getting Started
To get started with Ascendable, follow these steps:

Set Up Your Environment: Ensure you have Node.js and Python installed on your machine. Also, set up MongoDB either locally or use a cloud provider like MongoDB Atlas.

Install Dependencies: Navigate to the app/ directory and install the necessary Node.js dependencies by running npm install.

Configure Your Database: Update the database connection settings in your app/ configuration files to point to your MongoDB instance.

Deploy the Flight Stats Lambda Functions: Ensure you have AWS CLI configured and deploy the Python Lambda functions located in flight-stats/ to your AWS account.

Run the Application: Start the Next.js application by running npm run dev in the app/ directory. Your Ascendable app should now be accessible at http://localhost:3000.

## Contributing
We welcome contributions to Ascendable! If you have suggestions for improvements or encounter any issues, please feel free to open an issue or submit a pull request.

## License
Ascendable is open source and licensed under the [GNU Affero General Public License v3.0](LICENSE).