# next-movies
This is a demo project for a cinema website that allows simple filtering on a list of movies and viewing a specific one in a dialog view.

Filters enable filtering by a few types, and the lists are auto-completed as you type.

Filter button is enabled only when both filter type and value were selected.

In addition, there's a reset button that is enabled only when the filter was applied.

Filter types:
 * Rating - Greater than or equals to selected value.
 * Publish year - Greater than or equals to selected value.
 * Movie name - Equals to selected value
 * Movie duration - Less than or equals to selected value.
 
 In order to get more details on the movie you can either click the `Explore` button or the image of the movie.
 
 There's a caching mechanism for single movie requests.


## Pre-requisites
```
yarn global add @vue/cli
```
See [Backend mock project](https://github.com/next-insurance/next-test).

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```
In `vue.config.js` file, please comment out `publicPath` and `outputDir` (it didn't work with `process.env.NODE_ENV`)

### Compiles and minifies for production
```
yarn build
```
In `vue.config.js` file, please verify existence of `publicPath` and `outputDir` (it didn't work with `process.env.NODE_ENV`)

### Run your unit tests
```
yarn test:unit
```
Note: I didn't have enough time to add unit tests

### Lints and fixes files
```
yarn lint
```
