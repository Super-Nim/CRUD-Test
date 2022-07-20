### Code Review Test

This is a simple CRUD build to record songs and artist. A song can have multiple artists and an artist can have multiple songs

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

# start server
# Swagger Documentations available at http://localhost:9090/api*
```
