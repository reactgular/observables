[![Build Status](https://travis-ci.org/reactgular/observables.svg?branch=master)](https://travis-ci.org/reactgular/observables)
[![Coverage Status](https://coveralls.io/repos/github/reactgular/observables/badge.svg?branch=master)](https://coveralls.io/github/reactgular/observables?branch=master)
[![npm version](https://badge.fury.io/js/%40reactgular%2Fobservables.svg)](https://badge.fury.io/js/%40reactgular%2Fobservables)

## What is Observables?

Observables is a small Rxjs 6 library that contains handy operators and utilities.

## Why use this rxjs library?

This library contains operators and utilities that solve some very common problems that I face with Rxjs. Here is
a quick list of features that I use most often in projects.

- `ifOp()` and `ifElseOp()` apply operators based upon conditions.
- `windowResize()` creates a debounced observable of window size changes.
- `withSwitchMap()` uses `switchMap()` but emits the outer and inner values.
- `enabledWhen()` only emits when another observable emits `true`.

## Installation

To get started, install the package from npm.

```bash
npm install @reactgular/observables
```

## Usage

Utility functions are imported directly from the package path `@reactgular/observables`, but operators are
imported from `@reactgular/observables/operators`.

For example;

```typescript
import {windowResize} from '@reactgular/observables';
import {distinctStringify} from '@reactgular/observables/operators';

windowResize(250).pipe(
  distinctStringify()
).subscribe(v => console.log(v));
```

# Operators

Here is a list of observable operators that you can use from this library.

Operators | Operators | Operators | Operators
-----------|-----------|-----------|-----------
[disabledWhen](#disabledwhen) | [distinctStringify](#distinctstringify) | [enabledWhen](#enabledwhen) | [falsy](#falsy)
[ifOp](#ifop) | [negate](#negate) | [truthy](#truthy) | [withMergeMap](#withmergemap)
[withSwitchMap](#withswitchmap) | [](#) | [](#) | [](#)

# Utilities

Here is a list of utility functions that you can use from this library.

Operators | Operators | Operators | Operators
-----------|-----------|-----------|-----------
[toObservable](#toobservable) | [windowResize](#windowresize) | [](#) | [](#)


## Operators List

### disabledWhen

Disables emitting of values while the passed observable emits true.

```typescript
disabledWhen<T>(disabled$: Observable<boolean>): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/disabled-when.ts)] [[up](#operators)]

----
### distinctStringify

Emits all items emitted by the source Observable that are distinct by comparison using `JSON.stringify()` on each value.

```typescript
distinctStringify<T>(): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/distinct-stringify.ts)] [[up](#operators)]

----
### enabledWhen

Enables emitting of values while the passed observable emits `true`.

```typescript
enabledWhen<T>(enabled: Observable<boolean>): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/enabled-when.ts)] [[up](#operators)]

----
### falsy

Emits only *falsy* values. Performs a `filter(v => !v)` operator internally.

```typescript
falsy<T>(): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/falsy.ts)] [[up](#operators)]

----
### ifOp

Apply an operator based on a condition. This operator only adds another operator when the
condition is *true*. When the condition is *false* the source observable is not modified.

```typescript
function ifOp<T, R>(cond: boolean, operator: OperatorFunction<T, R>): OperatorFunction<T, T | R>
```

Examples:

Creates an observable of Window resize events with optional debouncing.

```typescript
function windowResize(debounce?: number) {
   return fromEvent(window, 'resize').pipe(
      ifOp(Boolean(debounce), debounceTime(debounce))
   );
}
```

If you are looking to apply two different operators based upon a conditional *if/else*, then you can use
a simple `?:` condition in the `pipe()` chain.

```typescript
example$.pipe(
   cond ? switchMap(project) : mergeMap(project)
);
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/if-op.ts)] [[up](#operators)]

----
### negate

Maps *truthy* values to `false`, and *falsy* values to `true`. Performs a `map(v => !v)` internally.

```typescript
negate<T>(): OperatorFunction<T, boolean>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/negate.ts)] [[up](#operators)]

----
### truthy

Emits only truthy values. This operator is an alias for `filter(v => Boolean(v))`, but most people write
`filter(Boolean)` because it's shorter. The problem with using `filter(Boolean)` is that the observable
type is changed to `Boolean`. So using `truthy()` is a shorter alias for the longer form that persists the
generic type. 

```typescript
truthy<T>(): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/truthy.ts)] [[up](#operators)]

----
### withMergeMap

Applies a [mergeMap](https://rxjs.dev/api/operators/mergeMap) to the outer observable, and maps the inner observable to an array that contains
the value of both the outer and inner observables as `Observable<[outer, inner]>`.

```typescript
withMergeMap<T, R>(inner: (x: T) => Observable<R>): OperatorFunction<T, [T, R]>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/with-merge-map.ts)] [[up](#operators)]

----
### withSwitchMap

Applies a [switchMap](https://rxjs.dev/api/operators/switchMap) to the outer observable, and maps the inner observable to an array that contains
the value of both the outer and inner observables as `Observable<[outer, inner]>`.

```typescript
withSwitchMap<T, R>(inner: (x: T) => Observable<R>): OperatorFunction<T, [T, R]>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/with-switch-map.ts)] [[up](#operators)]

----
## Utilities List

### toObservable

Converts the parameter to an observable, or returns the value if already an observable.

```typescript
toObservable<T>(value: T | Observable<T>): Observable<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/to-observable.ts)] [[up](#utilities)]

----
### windowResize

Emits changes in the window size with optional debounce time.

```typescript
windowResize(debounce?: number, wnd?: Window): Observable<{ innerWidth: number, innerHeight: number }>
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/window-resize.ts)] [[up](#utilities)]

----
