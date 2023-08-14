FROM node:18

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# package.json 및 패키지 설치
COPY package*.json ./

# Google Chrome 및 폰트 설치
# RUN apt-get update \
#     && apt-get install -y wget gnupg \
#     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#     && apt-get update \
#     && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
#       --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*
RUN npm install
RUN apt-get update && apt-get install -y \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget
RUN apt-get install -y libgbm-dev
# 앱 소스 추가
COPY . .
# Puppeteer 및 사용자 생성
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /usr/src/app/node_modules \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/src/app/package.json \
    && chown -R pptruser:pptruser /usr/src/app/package-lock.json

# Run everything after as non-privileged user.
USER pptruser



# 컨테이너 시작 시 Google Chrome 실행
CMD ["npm", "start"]





# FROM node:18

# # 앱 디렉터리 생성
# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install
# RUN apt-get update \
#     && apt-get install -y wget gnupg \
#     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#     && apt-get update \
#     && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
#       --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

# RUN npm init -y &&  \
#     npm i puppeteer \
#     # Add user so we don't need --no-sandbox.
#     # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
#     && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
#     && mkdir -p /home/pptruser/Downloads \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /node_modules \
#     && chown -R pptruser:pptruser /package.json \
#     && chown -R pptruser:pptruser /package-lock.json

# RUN chown -R pptruser:pptruser /node_modules

# # RUN apt-get update && apt-get install -y gnupg wget && \
# #     wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
# #     echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
# #     apt-get update && \
# #     apt-get install -y google-chrome-stable --no-install-recommends && \
# #     rm -rf /var/lib/apt/lists/*
# # # Puppeteer 종속성 설치
# # RUN apt-get update && apt-get install -y \
# #     gconf-service \
# #     libasound2 \
# #     libatk1.0-0 \
# #     libatk-bridge2.0-0 \
# #     libc6 \
# #     libcairo2 \
# #     libcups2 \
# #     libdbus-1-3 \
# #     libexpat1 \
# #     libfontconfig1 \
# #     libgcc1 \
# #     libgconf-2-4 \
# #     libgdk-pixbuf2.0-0 \
# #     libglib2.0-0 \
# #     libgtk-3-0 \
# #     libnspr4 \
# #     libpango-1.0-0 \
# #     libpangocairo-1.0-0 \
# #     libstdc++6 \
# #     libx11-6 \
# #     libx11-xcb1 \
# #     libxcb1 \
# #     libxcomposite1 \
# #     libxcursor1 \
# #     libxdamage1 \
# #     libxext6 \
# #     libxfixes3 \
# #     libxi6 \
# #     libxrandr2 \
# #     libxrender1 \
# #     libxss1 \
# #     libxtst6 \
# #     ca-certificates \
# #     fonts-liberation \
# #     libappindicator1 \
# #     libnss3 \
# #     lsb-release \
# #     xdg-utils \
#     wget

# # 프로덕션을 위한 코드를 빌드하는 경우
# # RUN npm ci --omit=dev

# # 앱 소스 추가
# COPY . .
# USER pptruser

# # EXPOSE 3300
# CMD ["google-chrome-stable"]
# # CMD ["npm", "start", "--no-sandbox"]

