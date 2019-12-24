install:
	yarn

start:
	npx babel-node src/bin/
run:
	node dist/bin

build:
	rm -rf dist && yarn build

publish:
	npm publish

lint:
	npx eslint src

test:
	yarn test

test-coverage:
	yarn test -- --coverage