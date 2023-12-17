# Project abstract

## Title: *KeyUsageProfiler*

## Description

An app that tracks the usage of keys in a keyboard while giving some users statistics about them in intuitive ways.

Made for the IES course on school year 23/24

# Project Team

*Team Manager* - Miguel Pinto miguel.silva48@ua.pt

*Product Owner* - Ricardo Quintaneiro ricardoquintaneiro@ua.pt

*DevOps* - Miguel Figueiredo miguel.belchior@ua.pt

*Architect* - João Dourado joao.dourado1@ua.pt

# How to run

```bash
#clone repository locally
git clone git@github.com:miguel-silva48/KeyUsageProfiler.git; 
cd KeyUsageProfiler;
```

### Running the App (requires Docker)

```bash
docker compose up -d;     # create docker containers
```

### Running Keylogger Sensor (requires Maven)
```bash
cd projSensor/keylogger_sensor/;
mvn package;
mvn exec:java -Dexec.mainClass="com.mibef108287.app.App";
```

# Architecture Diagram

![Architecture Diagram](ArchitectureDiagram.png)

# Bookmarks

## Management Board
An overall view of the user stories and their status can be found in the following link:

https://github.com/users/miguel-silva48/projects/1

## Cloud versions of reports and others

Project_Specification_Report:

https://docs.google.com/document/d/1QzRJoO-oqjjJ1CPPHerlChldXcHeHqTO6yjKa63GLKo/edit

Prototype (Figma):

https://www.figma.com/file/obImDvzy220l7wHxBSFWRW/KeyUsageProfiler?type=design&node-id=0%3A1&mode=design&t=VuI7D2o2buKyOZtO-1

Presentation:

https://uapt33090-my.sharepoint.com/:p:/g/personal/miguel_silva48_ua_pt/ERWlUb28TctClTy3tQ5ZVDoBAm1qZnAHgZtkv3IM4jm14w?e=7qN5bp

## Entry point to the API documentation


While running the backend service, access the following endpoint:
[http://localhost:8080/swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/)

