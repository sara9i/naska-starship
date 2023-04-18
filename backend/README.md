# naska-starship

This is an assignment project for Naska.ai.

## Getting Started

1. Go to the backend dirrectory `cd backend`
2. Install dependencies: `npm install`.
3. Create a .env file in the root directory of the server project to set these environment variables.
`PORT`: The port on which the application will listen.
`MONGO_DB_URL`: The URL of the MongoDB database.
4. Run the development server: `npm run start`.
5. Access the app on `http://localhost:8000`.

## Scripts

- `npm run build`: build the app for production.
- `npm start`: start the app in development mode.
- `npm test`: run tests.

## Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [dotenv](https://github.com/motdotla/dotenv#readme)

## Project Structure

```bash
├── src/
│ ├── configs/
│ ├── controllers/
│ ├── interfaces/
│ ├── middlewares/
│ ├── models/
│ ├── services/
│ ├── tests/
│ ├── validators/
│ ├── global.ts
│ └── index.ts
│ └── routes.ts
├── .env
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```


- `src/controllers`: contains the controllers that define the routes of the application.
- `src/models`: contains the models that represent the data used by the application.
- `src/routes.ts`: contains the route handlers that define the behavior of the routes.
- `src/services`: contains the services that encapsulate the business logic of the application.
- `src/tests`: contains the tests for the application.
- `src/index.ts`: initializes the Express app and middlewares and starts the server.
- `.env`: environment variables that need to be set for the application to run.
- `.gitignore`: ignores files and directories that should not be tracked by Git.
- `package.json`: lists the project dependencies and scripts.
- `tsconfig.json`: configures the TypeScript compiler options.
- `README.md`: instructions and documentation for the project.

## Development Thought Process
- Write the first API to get starships from SWAPI and store in mongodb by filtering out only the ones containing "wing". This would reduce response time as we would be querrying our db instead of making an axios call
- Store the clicks information against each star ship in our db.
- Get click stats for starships in our db. Although we can get this info using the same API as 1 (once we store it in our db from swapi) since we are modifying same documents in 2nd API, having this stats API as a seperate one would be more scalable given it gives a much smaller response payload.
- Add a ratelimitter middleware to avoid too many requests from the same host. This serves as a security measure when thinking of developing on scale however even for a basic project as this one it can save someone clumsy like me on FE to quickly detect an infinite loop or incorrectly used hooks that make infinite calls to BE ;)