# 첫 번째 단계: Gradle 빌드를 수행하는 이미지를 만듭니다.
FROM gradle:8.5.0-jdk17 AS builder

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# Gradle 빌드에 필요한 파일을 복사합니다.
COPY build.gradle .
COPY settings.gradle .
COPY src src

# 테스트를 생략하고 JAR 파일을 빌드합니다.
RUN gradle assemble

# 두 번째 단계: 빌드된 JAR 파일을 사용하여 최종 이미지를 만듭니다.
FROM bellsoft/liberica-openjdk-alpine:17

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 이전 단계에서 빌드된 JAR 파일을 복사합니다.
COPY --from=builder /app/build/libs/*.jar app.jar

# 사용할 포트를 노출합니다.
EXPOSE 8080

# 컨테이너가 시작되었을 때 실행할 명령을 지정합니다.
CMD ["java", "-jar", "app.jar"]

