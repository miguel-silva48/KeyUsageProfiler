# KeyUsageProfiler

## Description

An app that tracks the usage of keys in a keyboard while giving some users statistics about them (may not be GDPR compliant).

Made for the IES course on school year 23/24

## Team

*Team Manager* - Miguel Pinto miguel.silva48@ua.pt

*Product Owner* - Ricardo Quintaneiro ricardoquintaneiro@ua.pt

*DevOps* - Miguel Figueiredo miguel.belchior@ua.pt

*Architect* - João Dourado joao.dourado1@ua.pt

## Important Notes

To test  [user story #2](https://github.com/miguel-silva48/KeyUsageProfiler/issues/2) it's necessary to create an user with id 1. For instance posting the endpoint http://localhost:8080/api/users with the following body: 

```json
{
  "username" : "Miguel",
  "email": "miguel.belchior@ua.pt"
}
```

### How to run

```bash
git clone git@github.com:miguel-silva48/KeyUsageProfiler.git
cd KeyUsageProfiler
```

#### Running backend

```bash
docker compose up -d     # run backend services (DBs, MQ)
cd projBackend
./mvnw spring-boot:run   # run spring backend
```

#### Running frontend

```bash
cd projFrontend
npm install
npm run dev   # run frontend
```


## Architecture Diagram

![Architecture Diagram](ArchitectureDiagram.png)

## Bookmarks

### Management Board
An overall view of the user stories and their status can be found in the following link:

https://github.com/users/miguel-silva48/projects/1

### Cloud versions of reports and others

Project_Specification_Report: 

https://docs.google.com/document/d/1QzRJoO-oqjjJ1CPPHerlChldXcHeHqTO6yjKa63GLKo/edit

Prototype (Figma):

https://www.figma.com/file/obImDvzy220l7wHxBSFWRW/KeyUsageProfiler?type=design&node-id=0%3A1&mode=design&t=VuI7D2o2buKyOZtO-1

### Entry point to the API documentation
#todo
