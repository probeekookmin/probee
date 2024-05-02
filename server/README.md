## 서버 환경변수
```properties
# postgres setting
spring.datasource.url = DB_URL
spring.datasource.username = DB_USERNAME
spring.datasource.password = DB_PASSWORD
spring.datasource.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# hibernate setting
spring.jpa.properties.hibernate.use_sql_comments=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.generate-ddl=true

# health checking
management.endpoints.enabled-by-default=false
management.endpoint.health.enabled=true
management.endpoints.web.exposure.include=health
management.endpoint.health.show-details=always

# S3
cloud.aws.credentials.accessKey= S3_ACCESS_KEY
cloud.aws.credentials.secretKey= S3_SECRET_KEY
cloud.aws.s3.bucketName = S3_BUCKET_NAME
cloud.aws.region.static = S3_REGION
cloud.aws.stack.auto=false

# AI Server
aiServer.url= AISERVER_URL

#Sms service (SOLAPI)
sms.key = SMS_SERVICE_KEY
sms.secret = SMS_SECRET_KEY
phone_num = PHONE_NUMBER
```
## SMS서비스

### SOLAPI
#### 주소 : https://solapi.com/
#### 사용법 : https://developers.solapi.com/sdk-list/Java/send-message


