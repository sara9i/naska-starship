# Project Title

Star Wars Starship Client

## Description

This application acts as a frontend for a project.

## Getting Started

1. Go to the backend dirrectory `cd frontend`
2. Install dependencies: `npm install`.
3. Create a .env file in the root directory of the server project to set these environment variables.
`REACT_APP_API_URL`: The backend/server URL to which the API sends requests.
4. Run the development server: `npm run start`.
5. Access the app on `http://localhost:3000`.

## Scripts

- `npm run build`: build the app for production.
- `npm start`: start the app in development mode.

## Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [dotenv](https://github.com/motdotla/dotenv#readme)

## Project Structure

```bash
├── src/
│ ├── services/
│ ├── components/
│ ├── ├── Header/
│ ├── ├── Sidebar/
│ ├── ├── Viewer/
│ ├── types/
│ ├── App.tsx
│ ├── index.tsx
├── package.json
├── .env
└── README.md
```


- `src/services`: contains the services for making API requests to backend.
- `src/components`: contains the react components for header, sidebar and 3d viewer.
- `src/types`: contains interface/structure/type for starship object.
- `src/tests`: contains the tests for the application.
- `src/index.ts`: initializes and starts the React app.
- `.env`: environment variables that need to be set for the application to run.
- `package.json`: lists the project dependencies and scripts.
- `tsconfig.json`: configures the TypeScript compiler options.
- `README.md`: instructions and documentation for the project.

## Development Thought Process
- Write the header componenr with logo.
- Write the sidebar component using Drawer.
- Update the sidebar component so that it shows starships name received as props and their corresponding click counts.
- Write the viewer component using three js to display cubes.
- Modify the viewer component so that it shows the number of cubes corresponding to the number of starships received in props.
- animate the 3D cubes to rotate.
- Modify the viewer so that it shows the starship name on each corresponding cube using canvas.
- Modify the viewer code to add onClick listener on cubes that calls the /click api on BE to increment the click count of the cube that was clicked upon.