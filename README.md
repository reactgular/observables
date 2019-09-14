[![Build Status](https://travis-ci.org/reactgular/observables.svg?branch=master)](https://travis-ci.org/reactgular/observables)
[![Coverage Status](https://coveralls.io/repos/github/reactgular/observables/badge.svg?branch=master)](https://coveralls.io/github/reactgular/observables?branch=master)
[![npm version](https://badge.fury.io/js/%40reactgular%2Fobservables.svg)](https://badge.fury.io/js/%40reactgular%2Fobservables)

## What is Observables?

Observables is a small Angular library that contains rxjs operators.

## Why another console rxjs library?

I needed somewhere to share common operators that I've created on various projects. I've tried to make these operators are generic and reusable as possible so
that they can be applied to a wider range of situations.

## Installation

To get started, install the package from npm. The latest version (1.x) supports Angular 8.

```bash
npm install --save @reactgular/observables

# or if you are using yarn
yarn add @reactgular/observables
```

Each operator or utility function can be imported directly from the package path `@reactgular/observables`.

For example;

```typescript
import {of} from 'rxjs';
import {distinctStringify} from '@reactgular/observables';

of([1,2,3], [1,2,3], [4,5,6]).pipe(
  distinctStringify()
).subscribe(v => console.log(v)); // prints "[1,2,3] [4,5,6]"
```

# Operators

Here is a list of rxjs operators that you can use from this library.

 Operators | Operators | Operators | Operators
-----------|-----------|-----------|-----------
[debounceTimeIf](#debounceTimeIf) | [disabledWhen](#disabledWhen) | [distinctStringify](#distinctStringify) | [enabledWhen](#enabledWhen)
[falsy](#falsy) | [negate](#negate) | [throttleTime](#throttleTime) | [truthy](#truthy)
[withMergeMap](#withMergeMap) | [withSwitchMap](#withSwitchMap) | [](#) | [](#)

## debounceTimeIf

Conditionally apply a [debounceTime](https://rxjs.dev/api/operators/debounceTime) operator.

```typescript
debounceTimeIf<T>(cond: boolean, duration: number): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/debounce-time-if.ts)]

## disabledWhen

Disables emitting of values while the passed observable emits true.

```typescript
disabledWhen<T>(disabled$: Observable<boolean>): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/disabled-when.ts)]

## distinctStringify

Emits all items emitted by the source Observable that are distinct by comparison using `JSON.stringify()` on each value.

```typescript
distinctStringify<T>(): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/distinct-stringify.ts)]

## enabledWhen

Enables emitting of values while the passed observable emits `true`.

```typescript
enabledWhen<T>(enabled: Observable<boolean>): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/enabled-when.ts)]

## falsy

Emits only *falsy* values. Performs a `filter(v => !v)` operator internally.

```typescript
falsy<T>(): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/falsy.ts)]

## negate

Maps *truthy* values to `false`, and *falsy* values to `true`. Performs a `map(v => !v)` internally.

```typescript
negate(): MonoTypeOperatorFunction<boolean>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/negate.ts)]

## throttleTime

Conditionally apply a [throttleTime](https://rxjs.dev/api/operators/throttleTime) operator.

```typescript
throttleTimeIf<T>(cond: boolean, duration: number): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/throttle-time.ts)]

## truthy

Emits only truthy values. This operator is an alias for `filter(v => Boolean(v))`, but most people write
`filter(Boolean)` because it's shorter. The problem with using `filter(Boolean)` is that the observable
type is changed to `Boolean`. So using `truthy()` is a shorter alias for the longer form that persists the
generic type. 

```typescript
truthy<T>(): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/truthy.ts)]

## withMergeMap

Applies a [mergeMap](https://rxjs.dev/api/operators/mergeMap) to the outer observable, and maps the inner observable to an array that contains
the value of both the outer and inner observables as `Observable<[outer, inner]>`.

```typescript
withMergeMap<T, R>(inner: (x: T) => Observable<R>): OperatorFunction<T, [T, R]>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/with-merge-map.ts)]

## withSwitchMap

Applies a [switchMap](https://rxjs.dev/api/operators/switchMap) to the outer observable, and maps the inner observable to an array that contains
the value of both the outer and inner observables as `Observable<[outer, inner]>`.

```typescript
withSwitchMap<T, R>(inner: (x: T) => Observable<R>): OperatorFunction<T, [T, R]>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/with-switch-map.ts)]

