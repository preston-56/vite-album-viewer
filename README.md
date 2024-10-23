# Album Viewer

**Album Viewer** is a responsive web application that provides an intuitive platform for displaying user-related data and their associated albums, utilizing the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

This application enables users to effortlessly navigate through user information, view album counts, and access individual album pages, ensuring a seamless experience across mobile, tablet, and desktop devices.

## Features

- **User Authentication:** Secure login via familiar auth providers (Google).
- **User List:** Displays all users along with the number of albums each user has.
- **User Albums:** View detailed information for a selected user, including their albums.
- **Album Details:** Access photos within an album, with functionality to edit photo titles.
- **Responsive Design:** Optimized for mobile, tablet, and desktop layouts.

## Technologies Used

- **Frontend Framework:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Chakra UI](https://v2.chakra-ui.com/)
- **Testing:** [Vitest](https://vitest.dev/) for unit testing components
- **State Management:** [Context API](https://react.dev/reference/react/useContext) for user authentication and data handling
- **Linting:** [ESLint](https://eslint.org/) configured to ensure code quality

## Installation

To setup the project locally, follow these steps:

1. Clone the repository:
   
   For **SSH**, use:

   ```bash
   git clone git@github.com:preston-56/vite-album-viewer.git
   ```

   For  **HTTPS**, use:
   ```bash
   git clone https://github.com/preston-56/vite-album-viewer.git
   ```
2. Navigate to the project directory:

   ```bash
   cd vite-album-viewer/frontend
   ```
3. Install dependencies using Yarn:

   ```bash
   yarn install
   ```
4. Run the application

   ```bash
   yarn dev
   ```

## Testing
- The frontend includes [Vitest](https://vitest.dev/) as the testing framework to run tests for the components and ensure their functionality.
- These tests are located in the `src/test/` directory.
- To run the tests for the components(Home and Users), use:
  ```bash
  yarn test
  ```


## Code Quality

- The project includes ESLint for maintaining code quality.
- To format your code, run:
  ```bash
  yarn format
  ```

## Deployment

- This application (frontend) is hosted on [Netlify](https://www.netlify.com/) as a deployment service with a free tier.
- The deployment is automated through pipeline jobs to ensure seamless updates after checks have been met.
- The application can be accessed here: [live link](https://sageauth.netlify.app/home)

<div style="text-align: center;">
    <h4>Vault Album Viewer</h4>
    <img src="./frontend/public/iPhone-13-PRO-sageauth.netlify.app.png" alt="Album Viewer" width="200px">
    <p><a href="https://sageauth.netlify.app/home">View Application</a></p>
</div>
