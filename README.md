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
[counter](#counter) | [disabledWhen](#disabledwhen) | [distinctStringify](#distinctstringify) | [enabledWhen](#enabledwhen)
[falsy](#falsy) | [ifOp](#ifop) | [negate](#negate) | [pluckDistinct](#pluckdistinct)
[trackStatus](#trackstatus) | [truthy](#truthy) | [withMergeMap](#withmergemap) | [withSwitchMap](#withswitchmap)

# Utilities

Here is a list of utility functions that you can use from this library.

Operators | Operators | Operators | Operators
-----------|-----------|-----------|-----------
[combineEarliest](#combineearliest) | [combineFirst](#combinefirst) | [toObservable](#toobservable) | [windowResize](#windowresize)


## Operators List

### counter

Increments a counter for each emitted value.

```typescript
counter<T>(): OperatorFunction<T, [number, T]>
```

Example:

```typescript
of('a', 'b', 'c', 'd').pipe(
    counter()
).subscribe(v => console.log(v));
// [1, 'a']
// [2, 'b']
// [3, 'c']
// [4, 'd']    
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/counter.ts)] [[up](#operators)]

----
### disabledWhen

The inner observable can emit a *truthy* value to stop the emitting of values from the
outer observable, and emit a *falsy* to resume emitting values.

> Does not emit any values until the inner observable emits a *falsy* value.

```typescript
disabledWhen<T>(disabled$: Observable<boolean>): MonoTypeOperatorFunction<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/disabled-when.ts)] [[up](#operators)]

----
### distinctStringify

Emits all items from the source Observable that are distinct by comparison using `JSON.stringify()` on each value.

> Arrays with same values in different orders will be seen as different, and the same for objects with properties in different order.

```typescript
distinctStringify<T>(): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of([1,2,3], [1,2,3], [3,2,1], {a: 1}, {a: 1}, {a: 1, b: 1}, {b: 1, a: 1}, "one", "one", "two")
    .pipe(distinctStringify())
    .subscribe(v => console.log(v));

// [1,2,3]
// [3,2,1]
// {a: 1}
// {a: 1, b: 1}
// {b: 1, a: 1}
// "one"
// "two"
``` 

[[source](https://github.com/reactgular/observables/blob/master/src/operators/distinct-stringify.ts)] [[up](#operators)]

----
### enabledWhen

The inner observable can emit a *falsy* value to stop the emitting of values from the
outer observable, and emit a *truthy* to resume emitting values.

> Does not emit any values until the inner observable emits a *truthy* value.

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

Example:

```typescript
of(0, "Hello", false, [1,2], "")
    .pipe(falsy(), toArray())
    .subscribe(v => console.log(v)); // prints [0, false, ""]
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/falsy.ts)] [[up](#operators)]

----
### ifOp

Apply an operator based on a condition. This operator only adds another operator when the
condition is *true*. When the condition is *false* the source observable is not modified.

```typescript
ifOp<T, R>(cond: boolean, operator: OperatorFunction<T, R>): OperatorFunction<T, T | R>
```

Examples:

Creates an observable of Window resize events with optional debouncing.

```typescript
windowResize(debounce?: number) {
   return fromEvent(window, 'resize').pipe(
      ifOp(Boolean(debounce), debounceTime(debounce))
   );
}
```

If you are looking to apply two different operators based upon a conditional *if/else*, then you can use
a simple `?:` condition in the `pipe()` chain.

```typescript
function switchOrMerge(cond: boolean): Observable<number> {
    const projector = (value) => of(value).pipe(startWith(99));
    return of(1,2,3).pipe(
       cond ? switchMap(projector) : mergeMap(projector)
    );
}
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/if-op.ts)] [[up](#operators)]

----
### negate

Maps *truthy* values to `false`, and *falsy* values to `true`. Performs a `map(v => !v)` internally.

```typescript
negate<T>(): OperatorFunction<T, boolean>
```

Example:

```typescript
of(0, "Hello", false, [1,2,3], "").pipe(
    negate(),
    toArray()
).subscribe(v => console.log(v));
// prints [true, false, true, false, true]
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/negate.ts)] [[up](#operators)]

----
### pluckDistinct

Maps each source value (an object) to its specified nested property,
and only emits distinct changes. It is the same as applying a [pluck()](https://rxjs.dev/api/operators/pluck)
followed by a [distinctUntilChanged()](https://rxjs.dev/api/operators/distinctUntilChanged).

```typescript
pluckDistinct<T, R>(...properties: string[]): OperatorFunction<T, R>
```

Example:

```typescript
from([
    {name: 'John Smith'},
    {name: 'John Smith'},
    {name: 'Jane Doe'},
    {name: 'Jane Doe'}
]).pipe(
    pluckDistinct('name'),
    toArray()
).subscribe(v => console.log(v)); // prints ['John Smith', 'Jane Doe']
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/pluck-distinct.ts)] [[up](#operators)]

----
### trackStatus

Emits an Object with the properties *status* and *value*. The status property
will contain either `"start"`, `"value"` or `"error"`.

When the *status* property is:

- `"start"` the *value* is the first parameter or *undefined*. This is always the *first* emitted value.
- `"value"` the *value* property is the outer observable value.
- `"error"` the *value* is the caught error.

```typescript
trackStatus<T, S>(start?: S): OperatorFunction<T, TrackStatus<T | S>>
```

Example:

```typescript
of("Hello World").pipe(
    trackStatus()
).subscribe(v => console.log(v));
// prints 
// {state: "start", value: undefined}
// {state: "value", value: "Hello World"}
```

Using this operator makes it easy to create loading indicators
for Angular components.

Example:

```typescript
import {trackStatus, TrackStatus} from '@reactgular/observable/operators';

@Component({
    selector: 'example',
    template: `
        <ng-container *ngIf="track$ | async as track" [ngSwitch]="track.status">
            <div *ngSwitchCase='"start"'>
                Please wait while loading...
            </div>
            <div *ngSwitchCase='"value"'>
                {{track.value}}
            </div>
            <div *ngSwitchCase='"error"'>
                There was an error loading data...
            </div>
        </ng-container>`
})
export class ExampleComponent implements OnInit {
    public track$: Observable<TrackStatus<any>>;
   
    public constructor(private http: HttpClient) { }
   
    public ngOnInit() {
        this.data$ = this.http
            .get('https://example.com/api')
            .pipe(trackStatus());    
    }
}
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/track-status.ts)] [[up](#operators)]

----
### truthy

Emits only truthy values. This operator is an alias for `filter(v => Boolean(v))`, but most people write
`filter(Boolean)` because it's shorter. The problem with using `filter(Boolean)` is that the observable
type can change to `Boolean` by TypeScript. So using `truthy()` is a shorter alias for the longer form that persists the
generic type. 

```typescript
truthy<T>(): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of(0, false, [1,2,3], "Hello", "", {}).pipe(
    truthy(),
    toArray()
).subscribe(v => console.log(v));
// prints [[1,2,3], "Hello", {}]
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/truthy.ts)] [[up](#operators)]

----
### withMergeMap

Applies a [mergeMap](https://rxjs.dev/api/operators/mergeMap) to the outer observable, and maps the inner observable to an array that contains
the value of both the outer and inner observables as `Observable<[outer, inner]>`.

```typescript
withMergeMap<T, R>(inner: (x: T) => Observable<R>): OperatorFunction<T, [T, R]>
```

Example:

```typescript
of('A', 'B', 'C').pipe(
    withMergeMap(() => of('1'))
).subscribe(v => console.log(v));
// ['A', '1']
// ['B', '1']
// ['C', '1']
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/with-merge-map.ts)] [[up](#operators)]

----
### withSwitchMap

Applies a [switchMap](https://rxjs.dev/api/operators/switchMap) to the outer observable, and maps the inner observable to an array that contains
the value of both the outer and inner observables as `Observable<[outer, inner]>`.

```typescript
withSwitchMap<T, R>(inner: (x: T) => Observable<R>): OperatorFunction<T, [T, R]>
```

Example:

```typescript
of('A', 'B', 'C').pipe(
    withSwitchMap(() => of('1'))
).subscribe(v => console.log(v));
// ['A', '1']
// ['B', '1']
// ['C', '1']
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/with-switch-map.ts)] [[up](#operators)]

----
## Utilities List

### combineEarliest

Unlike [combineLatest()](https://rxjs.dev/api/index/function/combineLatest) which does not emit a value until
all observables emits at least one value. The `combineEarliest()` emits immediately upon the
first observable that emits a value substituting a value (defaults to `undefined`) for any awaiting values from the
other observables.

```typescript
combineEarliest<O extends Observable<any>, S, R>(observables: O[], substitute?: S): Observable<R>
```

Example:

```typescript
combineEarliest([
    interval(1000),
    of('A').pipe(delay(1000)),
    of('B').pipe(delay(2000))
]).pipe(take(3)).subscribe(v => console.log(v));

// [0, undefined, undefined]
// [1, 'A', undefined]
// [2, 'A', 'B']
``` 

[[source](https://github.com/reactgular/observables/blob/master/src/utils/combine-earliest.ts)] [[up](#utilities)]

----
### combineFirst

When all observables have emitted their first value, then emit an array of those values.

This operator is the opposite of [combineLatest()](https://rxjs.dev/api/index/function/combineLatest).

> Be aware that `combineFirst` will not emit an initial value until each observable emits a first value.

```typescript
combineFirst<O extends Observable<any>, R>(...observables: O[]): Observable<R>
```

Example:

```typescript
combineFirst([
    of(1, 2).pipe(delay(1000)),
    of(15, 16, 17),
    of(100, 110, 120, 130)
]).subscribe(v => console.log(v)); // prints [1, 15, 100]
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/combine-first.ts)] [[up](#utilities)]

----
### toObservable

Converts the parameter to an observable, or returns the value if already an observable.

```typescript
toObservable<T>(value: T | Observable<T>): Observable<T>
```

Example:

An example where an array of values is converted into an array of observables.

```typescript
const values = [100, of(200), 300];
forkJoin(values.map(toObservable))
    .subscribe(v => console.log(v));
// prints [100, 200, 300]
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/to-observable.ts)] [[up](#utilities)]

----
### windowResize

Emits changes in the window size with optional debounce time.

```typescript
windowResize(debounce?: number, wnd?: Window): Observable<{ innerWidth: number, innerHeight: number }>
```

Example:

Creates an observable of the window aspect ratio.

```typescript
const aspect$ = windowResize(250).pipe(
   map(({innerWidth, innerHeight}) => innerWidth / innerHeight)
);
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/window-resize.ts)] [[up](#utilities)]

----
