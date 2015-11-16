[![Build Status](https://travis-ci.org/mondora/asteroid-immutable-collections-mixin.svg?branch=master)](https://travis-ci.org/mondora/asteroid-immutable-collections-mixin)
[![Coverage Status](https://coveralls.io/repos/mondora/asteroid-immutable-collections-mixin/badge.svg?branch=master&service=github)](https://coveralls.io/github/mondora/asteroid-immutable-collections-mixin?branch=master)

# asteroid-immutable-collections-mixin

A mixin to implement Immutable collections for Asteroid.

## Install

### In node

Download the package:

    npm install asteroid-immutable-collections-mixin

## Example usage

```js
import {createClass} from "asteroid";
import * as asteroidImmutableMixin from "asteroid-collections-mixin";

const Asteroid = createClass([asteroidImmutableMixin]);

const asteroid = new Asteroid({platform, endpoint});

```
