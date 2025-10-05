# Etapa 1: Construcción (Build)
FROM maven:3.9.6-amazoncorretto-21 AS build
WORKDIR /app

# Copiar todo el código fuente
COPY . .

# Construir el proyecto sin ejecutar tests
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución (Run)
FROM amazoncorretto:21-alpine
WORKDIR /app

# Copiar el archivo .jar desde la etapa de build
COPY --from=build /app/target/Proyecto-Arqui-Web-Jorge-0.0.1-SNAPSHOT.jar app.jar

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
