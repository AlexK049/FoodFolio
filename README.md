# FoodFolio

## Welcome
Welcome to FoodFolio. To learn more about the problem this application addresses, target users, and features, see [here](Proposal/README.md).

## Getting Started
To get started with this project follow these steps:
1. Clone this repository to your local machine
2. Navigate to the project directory
3. Duplicate the `.env_sample` file and rename it to `.env`
4. Enter in values for the `MYSQL_DATABASE`, and `MYSQL_USER` fields. The `MYSQL_PASSWORD` field is optional. Then generate a random string for the  `JWT_SECRET` field.
5. Build and run the project using Docker Compose:
```
docker compose -f .\compose.yml up --build
```
6. Once the containers are up and running, you can access the project by going to `localhost` in your browser
7. Don't forget to stop the Docker containers when you're finished using the project:
```
docker-compose down
```
