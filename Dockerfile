FROM node:18

# 앱 디렉터리 생성
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --omit=dev

# 앱 소스 추가
COPY . .

EXPOSE 3300
CMD [ "npm", "start" ]
