FROM node:argon-slim

RUN groupadd -r app && useradd -r -d /usr/src/app -g app app

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

RUN apt-get -y autoclean \
 && apt-get -y autoremove \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY . /usr/src/app
RUN chown -R app:app /usr/src/app

CMD [ "node", "index.js" ]
