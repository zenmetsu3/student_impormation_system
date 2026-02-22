# Student Management System (SMS)

A web-based Student Management System built with Node.js and Express.

## 🚀 Features

- Student Registration and Enrollment
- Profile Management
- Admin Dashboard
- Search Functionality
- File Uploads (Photos)

## 🛠️ Prerequisites

- Node.js (LTS version recommended)
- npm (Node Package Manager)

## 📦 Installation (For New Users)

**Note:** If you are the developer setting up this project for the first time, skip this section and go to [Deployment](#deployment).

1.  Clone the repository:
    ```bash
    git clone https://github.com/zenmetsu3/student_impormation_system.git
    cd student_impormation_system
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)).

4.  Start the development server:
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:3000`.

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | The port the server runs on | `3000` |
| `SESSION_SECRET` | Secret key for session management (if applicable) | `your_secret_key` |
| `ADMIN_USERNAME` | Default admin username (for initial setup) | `admin` |

**Note:** Never commit your `.env` file to version control.

## 🚀 Deployment

### GitHub Actions (CI/CD)

This repository includes a GitHub Actions workflow for Continuous Integration (CI).
On every push to the `main` branch, the workflow will:
1.  Checkout the code.
2.  Install dependencies.
3.  Run tests (if configured).

### Manual Deployment

To deploy to a production environment (e.g., Render, Heroku, AWS):

1.  Ensure `start` script is defined in `package.json`:
    ```json
    "scripts": {
      "start": "node server.js"
    }
    ```
2.  Set the environment variables in your hosting provider's dashboard.
3.  Connect your GitHub repository to the hosting provider for automatic deployments.

### GitHub Pages (Frontend Only - Experimental)

**Note:** Since this is a Node.js/Express application, deploying to GitHub Pages will only serve the static frontend files (`public` folder). API endpoints and database features will NOT work. This is useful only for UI demonstration.

1.  **Deployment Overview**
    The deployment process involves:
    1.  **Building**: (Not applicable for this project, serves `public` folder directly).
    2.  **Validation**: Ensuring all necessary files exist.
    3.  **Publishing**: Pushing the contents of the `public` folder to the `gh-pages` branch on GitHub.

2.  **Prerequisites**
    Ensure you have the following installed and configured:
    -   **Node.js** (v18 or higher recommended)
    -   **Git** (configured with your username and email)
    -   **GitHub Repository** (connected as `origin`)

3.  **Configuration**
    
    **`package.json`**
    The deployment script is defined here:
    ```json
    "scripts": {
      "deploy": "node scripts/deploy.js"
    }
    ```

4.  **Manual Deployment Steps**
    To deploy the latest version of your website (frontend only):
    
    1.  Open your terminal in the project root.
    2.  Run the deployment command:
        ```bash
        npm run deploy
        ```
    3.  Wait for the script to finish. It will:
        -   Verify Git environment.
        -   Create `.nojekyll` file (critical for GitHub Pages).
        -   Push to `gh-pages` branch.

## 🛡️ Security

- **Secrets:** Store sensitive credentials (API keys, DB passwords) in GitHub Secrets (`Settings > Secrets and variables > Actions`).
- **Branch Protection:** Enable branch protection rules for `main` to require pull request reviews and status checks before merging.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License

Distributed under the ISC License.
