install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

publish:
	npm publish

g:
	rm -rf dist
	npm run build
	npm install -g

ung:
	npm uninstall -g

lint:
	npm run eslint .

.PHONY: test