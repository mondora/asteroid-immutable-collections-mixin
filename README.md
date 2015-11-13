[![Build Status](https://travis-ci.org/mondora/asteroid-collections-mixin.svg?branch=master)](https://travis-ci.org/mondora/aasteroid-collections-mixin)
[![Coverage Status](https://coveralls.io/repos/mondora/asteroid-collections-mixin/badge.svg?branch=master&service=github)](https://coveralls.io/github/mondora/asteroid-collections-mixin?branch=master)

# asteroid-collections-mixin

A mixin to implement Immutable collections for Asteroid.

## Install

### In node

Download the package:

    npm install asteroid-collections-mixin

## Example usage

```js
import {createClass} from "asteroid";
import * as asteroidCollectionsMixin from "asteroid-collections-mixin";

const Asteroid = createClass([asteroidCollectionsMixin]);

const asteroid = new Asteroid({platform, endpoint});

```
