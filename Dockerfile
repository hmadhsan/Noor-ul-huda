FROM adoptopenjdk/openjdk11:jre-11.0.8_10-alpine

RUN apk add --no-cache bash

RUN mkdir /opt/app

COPY target/*.jar /opt/app/admin-application.jar

CMD ["java", "-Xms150M", "-Xmx150M", "-Xss512k", "-XshowSettings:vm", "-jar", "/opt/app/admin-application.jar"]