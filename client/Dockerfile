FROM iojs

RUN groupadd -r app && useradd -r -d /usr/src/app -g app app

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY bower.json /usr/src/app/
RUN npm run bower

RUN apt-get -y autoclean \
 && apt-get -y autoremove \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY . /usr/src/app
RUN chown -R app:app /usr/src/app
RUN runuser -l app -c 'npm run build'

CMD [ "npm", "start" ]
