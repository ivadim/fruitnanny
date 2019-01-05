FROM arm32v7/node:lts-slim
ADD ../.. /fruitnanny
WORKDIR /fruitnanny
RUN npm install
CMD ["node", "server/app.js"]