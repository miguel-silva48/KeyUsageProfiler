# Keylogger

Built using the [JNativeHook library](https://github.com/kwhat/jnativehook) as a keyboard listener.

## Requirements

[**Java**](https://openjdk.org/install/) - JDK 17 or higher.

[**Maven**](https://maven.apache.org/) - Version 3.6.3 or higher. [Installation Guide](https://maven.apache.org/install.html).

## Configuration before running

Make sure you edit the **USER_ID** in the [.env](projSensor/keylogger_sensor/.env) file to the database id of the user you want to impersonate when producing the keystrokes. If you want to use the deployed version in the IES server change **RABBITMQ_HOST** to "deti-ies-16.ua.pt" (**DISCLAIMER: At this moment in time we had problems with our vm and the STIC didn't fix the issue so that we could deploye there our application. We'll send a mail if at any time the option for deployment is available for us again - that is, if STIC fix the issue**):

```bash
USER_ID=1
RABBITMQ_HOST="localhost"
```

## How to run

There are 2 strategies to run the keylogger.

### Build JAR and run

`mvn package` - creates full jar with dependencies at `target/`

`java -jar target/keylogger_sensor-1.0-SNAPSHOT-jar-with-dependencies.jar <USER_ID>` - run packaged jar and make sure to include param **user_id** related to who is sending the keylogged data.

### Get dependencies and run with Maven

`mvn install` - get and compile dependencies

`mvn exec:java -Dexec.mainClass="com.mibef108287.app.App" -Dexec.args="user_id"`  - directly runs the main class with Maven
