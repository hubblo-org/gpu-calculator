FROM node:20.11-alpine

LABEL org.opencontainers.image.authors="contact@hubblo.org"
LABEL org.opencontainers.image.description="Docker image for Hubblo GPU calculator, a calculator for evaluating a graphics card's environmental impacts"
LABEL org.opencontainers.image.licenses=Apache-2.0
LABEL org.opencontainers.image.title="gpu-calculator"

ENV PORT=5000
ENV ORIGIN=https://data.hubblo.org

WORKDIR /gpu-calculator

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "build"]
