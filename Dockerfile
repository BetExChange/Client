# Stage 1: Build the app
FROM gradle:8.5-jdk21 AS builder
COPY --chown=gradle:gradle . /app
WORKDIR /app
RUN gradle build -x test --no-daemon


# Stage 2: Run the app
FROM openjdk:21-jdk-slim
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
