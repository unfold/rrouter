PATH := ./node_modules/.bin/:$(PATH)

test: unit-test

install:
	@npm $@

unit-test:
	@jest

integration-test:
	@./node_modules/karma/bin/karma start --single-run

integration-test-ci:
	@./node_modules/karma/bin/karma start

lint:
	@eslint-jsx lib
