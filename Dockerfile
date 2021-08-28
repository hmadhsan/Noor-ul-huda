FROM adoptopenjdk/openjdk11:jre-11.0.8_10-alpine

RUN apk add --no-cache bash

RUN mkdir /opt/app

ARG BUILD_VERSION

ARG JAR_FILE="nha-admin-application-$BUILD_VERSION.jar"

RUN echo "Copying $JAR_FILE"

COPY target/$JAR_FILE /opt/app/nha-admin-application.jar

CMD ["java", "-Xms70M", "-Xmx150M", "-Xss512k", "-XshowSettings:vm", "-jar", "/opt/app/nha-admin-application.jar"]