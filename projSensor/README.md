# Keylogger

Built using the [JNativeHook library](https://github.com/kwhat/jnativehook) as a keyboard listener.

## Requirements

[**Java**](https://openjdk.org/install/) - JDK 17 or higher.

[**Maven**](https://maven.apache.org/) - Version 3.6.3 or higher. [Installation Guide](https://maven.apache.org/install.html).

## How to run

There are 2 strategies to run the keylogger.

### Build JAR and run

`mvn package` - creates full jar with dependencies at `target/`

`java -jar target/keylogger_sensor-1.0-SNAPSHOT-jar-with-dependencies.jar <USER_ID>` - run packaged jar and make sure to include param **user_id** related to who is sending the keylogged data.

### Get dependencies and run with Maven

`mvn install` - get and compile dependencies

`mvn exec:java -Dexec.mainClass="com.mibef108287.app.App" -Dexec.args="user_id"`  - directly runs the main class with Maven.