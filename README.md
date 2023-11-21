# naska-starship

This is an assignment project for Naska.ai.
# TASK
Coding requirements:


* The visualiser has to be built using the https://swapi.dev/ API, React.js, Three.js, Node.js and Mongo, you are free to use starter kits or additional libraries you find helpful.


Interface requirements:


The user interface should be made up of 3 sections: the header, the 3D viewer and sidebar.


* The header is made up of static content: a logo and a title.


* The 3D viewer displays randomly placed and randomly coloured 3D cubes for each starship


* The sidebar displays a list of starships and the number of times the corresponding geometry was clicked on in the 3D viewer


Application Requirements:


* You should only consider starships containing `wing` in their name (Y-wing, X-wing, A-wing, B-wing, T-70 X-wing fighter and V-wing at the time of writing). The application should query the SWAPI - The Star Wars API ( https://swapi.dev/ ) (https://swapi.dev/) for all starships and filter for the ones containing `wing` in their name.


* Hovering on a 3D cube in the 3D viewer should highlight the corresponding name in the sidebar list


* Clicking on a 3D cube in the 3D viewer should increment the corresponding value in the sidebar list


* The values displayed in the sidebar should be persisted in a mongo database and used as initial values when refreshing or relaunching the application



## Getting Started

Clone the repository: 
`git clone https://github.com/sara9i/naska-starship.git`

For detailed Instructions on how to run the client(frontend) and server (backend) please refer to the readme files in respective dirrectories

## Project Structure

```bash
├── backend
├── frontend
├── README.md
└── .gitignore
```
## Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Jest](https://jestjs.io/)
- [dotenv](https://github.com/motdotla/dotenv#readme)



- `backend`: contains the server code implementation of the web application.
- `frontend`: contains the client code implementation of the web application.

## Approach to project

- Clean and simple code for frontend and backend.
- Use typescript for both frontend (react) and backend
- Focus on learning to use new modules such as three.js for frontend

## Future Enhancements

- Write Dockerfile for both frontend and backend and a docker-compose file at root of the project to get both server and client up and runing with a single  command and agnostic of operating system ~2-3 hours, more if we want to include networking and complete stack with db.
- Write more detailed and complete unit tests. ~1 hour
- Style frontend better and free of logical errors. ~3-4 hours (given I take backend as my stronger suit, frontend implementation would take me longer in comparrison)
- Optimize code structure as well as code for scalability on backend. (have seperate route files, move cors as middleware)
- Complete Swagger Doc for backend APIs

## License

This project is licensed under the MIT License - see the LICENSE file for details.
