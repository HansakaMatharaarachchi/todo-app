# Build the application with Gradle.
FROM gradle:7.6.4-jdk17-alpine AS build

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

RUN chmod +x gradlew

RUN ./gradlew dependencies --no-daemon

COPY src ./src

RUN ./gradlew clean build --no-daemon


# Build the final runtime image with built jar.
FROM eclipse-temurin:17.0.14_7-jre-alpine-3.21

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

WORKDIR /app

COPY --from=build --chown=spring:spring /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]