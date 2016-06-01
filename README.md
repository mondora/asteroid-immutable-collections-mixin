[![npm version](https://badge.fury.io/js/asteroid-immutable-collections-mixin.svg)](https://badge.fury.io/js/asteroid-immutable-collections-mixin)
[![Build Status](https://travis-ci.org/mondora/asteroid-immutable-collections-mixin.svg?branch=master)](https://travis-ci.org/mondora/asteroid-immutable-collections-mixin)
[![Coverage Status](https://coveralls.io/repos/mondora/asteroid-immutable-collections-mixin/badge.svg?branch=master&service=github)](https://coveralls.io/github/mondora/asteroid-immutable-collections-mixin?branch=master)
[![Dependency Status](https://david-dm.org/mondora/asteroid-immutable-collections-mixin.svg)](https://david-dm.org/mondora/asteroid-immutable-collections-mixin)
[![devDependency Status](https://david-dm.org/mondora/asteroid-immutable-collections-mixin/dev-status.svg)](https://david-dm.org/mondora/asteroid-immutable-collections-mixin#info=devDependencies)

# asteroid-immutable-collections-mixin

A mixin to stores collections published by the server into an [immutable](http://facebook.github.io/immutable-js) map.

## Install


    npm install --save asteroid-immutable-collections-mixin

## Development environment setup

After cloning the repository, install `npm` dependencies with `npm install`.
Run `npm test` to run unit tests, or `npm run dev` to have `mocha` re-run your
tests when source or test files change.

## Usage

```js
import {createClass} from "asteroid";
import immutableCollectionMixin from "asteroid-immutable-collections-mixin";

const Asteroid = createClass([immutableCollectionMixin]);

const asteroid = new Asteroid({
    endpoint: "ws://localhost:3000/websocket"
});

// Somewhere in your code:
import {Map} from "immutable";

// Use real-time collections
asteroid.subscribe("collection-name");

// Collection is an immutable map
const collection = asteroid.collections.get("collection-name") || Map();

```

## API

### getServiceConfig(providerName)

This method is to use this mixin with the
[asteroid-oauth-mixin](https://github.com/mondora/asteroid-oauth-mixin).

##### Arguments

- `providerName` **string** _required_: the provider name with whom you want to login with Oauth.

##### Returns

An object that contains the `clientId`, the `consumerKey` or the `appId` that is used by the `asteroid-oauth-mixin`.
