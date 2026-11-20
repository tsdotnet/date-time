![@tsdotnet/date-time: Time you can add up. DateTime and TimeSpan, as in .NET.](https://cdn.jsdelivr.net/gh/tsdotnet/date-time@master/assets/banner.svg)

[![npm version](https://img.shields.io/npm/v/@tsdotnet/date-time.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/date-time)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/date-time/blob/master/LICENSE)

`DateTime` and `TimeSpan` model dates and durations the way .NET does, with immutable values and simple arithmetic.

## Install

```sh
npm install @tsdotnet/date-time
```

## Usage

```ts
import { DateTime, TimeSpan } from '@tsdotnet/date-time';

const due = DateTime.now.add(TimeSpan.fromDays(7));
const left = DateTime.between(DateTime.now, due); // a TimeSpan
left.hours; // about 168
TimeSpan.fromHours(36).days; // 1.5 (a total, not .NET's whole-day part)
```

A `TimeSpan` is an immutable length of time; a `DateTime` is a point you move with `add`, `subtract` and `addDays`.

## Use it from

ESM (`import { DateTime, TimeSpan } from '@tsdotnet/date-time';`) or CommonJS (`const { DateTime, TimeSpan } = require('@tsdotnet/date-time');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/compare@1/dist/umd/compare.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/disposable@2/dist/umd/disposable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/lazy@2/dist/umd/lazy.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/date-time@2/dist/umd/date-time.min.js"></script>
<script>
  const { DateTime, TimeSpan } = tsdotnet.dateTime;
</script>
```

</details>

## Docs

[tsdotnet.github.io/date-time](https://tsdotnet.github.io/date-time/)
