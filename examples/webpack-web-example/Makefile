include .env

init:
	yarn install && sudo chmod +x -R ./cli && init-application;

start:
	./cli/start.js;

start-pull:
	./cli/start.js -p;

stop:
	./cli/stop.js;

restart:
	./cli/restart.js;

init-application:
	docker run --rm -v `pwd`/application:/app eldy/node:18-alpine3.16 bash -c "yarn";

run-node:
	docker run --rm -it -v `pwd`/application:/app eldy/node:18-alpine3.16 bash;

webpack-build:
	docker run --rm -v `pwd`/application:/app eldy/node:18-alpine3.16 bash -c "yarn build";

webpack-build-dev:
	docker run --rm -v `pwd`/application:/app eldy/node:18-alpine3.16 bash -c "yarn build:dev";

webpack-watch:
	docker run --rm -v `pwd`/application:/app eldy/node:18-alpine3.16 bash -c "yarn watch";

