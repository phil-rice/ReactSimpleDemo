# React

This is just a simple demo for how we can use dependency injection and single responsibility to make react pages that are clean and are
simple enough that it can be seen what is on them when we read the page.

There is no attempt to make the gui 'beautiful': this is about how we break things up and put them back together. 

## Doing things

* `yarn start` will start the project running. (It might work with npm...)
* `yarn storybook` will open the storybook for the project
* `yarn test` will run the tests
* `yarn test:coverage` incorrectly includes the stories at the moment

# Web places
* [Git Repo](https://github.com/phil-rice/ReactSimpleDemo)
* [Github actions (CI pipeline)](https://github.com/phil-rice/ReactSimpleDemo/actions) 

#Running the pact server
docker pull pactfoundation/pact-stub-server
docker run -t -p 8080:8080 -v "$(pwd)/pacts/:/app/pacts" pactfoundation/pact-stub-server -p 8080 -d pact/pacts

test it by going to http://localhost:8080/statement/mycid


