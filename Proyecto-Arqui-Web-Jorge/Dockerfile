# Etapa 1: Construcción
FROM maven:3.9.8-amazoncorretto-17 AS build
WORKDIR /app

# Copiar solo el subproyecto que contiene el pom.xml
COPY Proyecto-Arqui-Web-Jorge /app

# Construir el .jar sin ejecutar los tests
RUN mvn -f /app/pom.xml clean package -DskipTests

# Etapa 2: Ejecución
FROM amazoncorretto:17-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]