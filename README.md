# Express App

This is an Express application designed to provide a robust and scalable backend for various use cases. Follow the instructions below to set up and run the application on your local machine.

## Requirements

- **Node.js**: v22.12.0
- **npm**: v10.9.0

Ensure you have these versions installed before proceeding.

## Setup Instructions

Follow these steps to set up the project:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**

   Use `sudo` to ensure permissions for installing dependencies globally if needed:

   ```bash
   sudo npm install
   ```

3. **Configure Environment Variables**

   Copy the development environment configuration file and edit it to include your own values:

   ```bash
   cp .dev.env .env
   ```

   Open the `.env` file in your preferred text editor and fill in the required values.

4. **Run Database Migrations**

   Apply migrations to set up the database schema:

   ```bash
   sudo npm run migrate
   ```

5. **Set Permissions**

   Grant necessary permissions to the `prisma` directory:

   ```bash
   sudo chmod -R 777 ./prisma
   ```

6. **Start the Development Server**

   Run the application in watch mode for hot reloading:

   ```bash
   npm run watch
   ```

## Additional Notes

- If you encounter permission issues, ensure that your user has the necessary privileges or try running the commands with `sudo`.
- Make sure the `.env` file is correctly configured to avoid runtime errors.
- The app is designed to restart automatically in watch mode whenever file changes are detected.

## Contribution

Feel free to contribute to this project by submitting issues or creating pull requests. Make sure to follow the project's code style and guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

