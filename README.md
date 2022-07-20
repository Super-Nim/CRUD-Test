### Key Test

The application is build using nestjs framework build in nodejs and express .
https://nestjs.com/

### Environment

| ---- | ----- |
| Node | >= 16 |

### Setup

```bash
# Steps to start the project
1. Start postgresql and create new database music_db
2. Copy .env.example to .env and change the database credentials and database name
3. Run npm install to install dependencies.
4. npm run db:migrate to run migrations to create songs and artist table
5. Import the postman collection in the root file into the postman to see the list of available apis [KeyService Music Crud.postman_collection.json]
# start server
# api available at http://localhost:9090/api*
6. npm run start:dev
7. With the example body run http://localhost:9090/api/artist POST method to create new artists (POSTMAN)
8. Get List of artists from http://localhost:9090/api/artist?page=1&perPage=4 GET method and record their ids (POSTMAN)
9. With example body run  http://localhost:9090/api/songs POST method to create new songs. On the body add the above recorded artist ids to create songs with artists

 # If I had enough time I would have added the following
 1. Add unit tests and end-to-end (supertest)
 2. Add proper swagger documentations using OpenApi
 3. Add logging and proper error handling
```
