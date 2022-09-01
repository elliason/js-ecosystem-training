include .env

install-slidev-packages:
	docker run --rm -v `pwd`/slidev:/app eldy/node:18-alpine3.16 bash -c "yarn";

run-slidev:
	docker run --rm -it -v `pwd`/slidev:/app eldy/node:18-alpine3.16 bash;

init:
	yarn install && sudo chmod +x -R ./cli;
	make install-slidev-packages;

start:
	./cli/start;

start-pull:
	./cli/start -p;

stop:
	./cli/stop;

restart:
	./cli/restart;

