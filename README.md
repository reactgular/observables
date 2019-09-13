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

```typescript
/**
 * Conditionally apply a debounce time operator.
 */
function debounceTimeIf<T>(cond: boolean, duration: number): MonoTypeOperatorFunction<T>;

/**
 * Disables emitting of values while the passed observable emits true.
 */
function disabledWhen<T>(disabled: Observable<boolean>): MonoTypeOperatorFunction<T>;

/**
 * Emits all items emitted by the source Observable that are distinct by comparison using JSON.stringify() on each value.
 */
function distinctStringify<T>(): MonoTypeOperatorFunction<T>;

/**
 * Enables emitting of values while the passed observable emits true.
 */
function enabledWhen<TType>(enabled: Observable<boolean>): MonoTypeOperatorFunction<TType>;

/**
 * Emits only falsy values. Identical to filter(v => !v) expect that the observable type is preserved.
 */
function falsy<T>(): MonoTypeOperatorFunction<T>;

/**
 * Maps values to an inverted boolean.
 */
function negate(): MonoTypeOperatorFunction<boolean>;

/**
 * Conditionally apply a throttle time operator.
 */
function throttleTimeIf<T>(cond: boolean, duration: number): MonoTypeOperatorFunction<T>;

/**
 * Emits only truthy values. Identical to filter(Boolean) expect that the observable type is preserved.
 */
function truthy<T>(): MonoTypeOperatorFunction<T>;

/**
 * Emits the inner observable value with the outer observable value as a pair array.
 */
function withMergeMap<T, R>(inner: (T: any) => Observable<R>): OperatorFunction<T, [T, R]>;

/**
 * Emits the inner observable value with the outer observable value as a pair array.
 */
function withSwitchMap<T, R>(inner: (T: any) => Observable<R>): OperatorFunction<T, [T, R]>;
```

# Utilities

Here is a list of utility functions that you can use from this library.

```typescript
/**
 * Converts the parameter to an observable, or returns the value if already an observable.
 */
function toObservable<T>(value: T | Observable<T>): Observable<T>;

/**
 * Emits changes in the window size with optional debounce time.
 */
function windowResize(debounce?: number): Observable<{
    innerWidth: number;
    innerHeight: number;
}>;
```
