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
[after](#after) | [before](#before) | [beforeError](#beforeerror) | [counter](#counter)
[disabledWhen](#disabledwhen) | [distinctArray](#distinctarray) | [distinctDeepEqual](#distinctdeepequal) | [distinctStringify](#distinctstringify)
[enabledWhen](#enabledwhen) | [falsy](#falsy) | [historyBuffer](#historybuffer) | [ifOp](#ifop)
[loadFirst](#loadfirst) | [mapFirst](#mapfirst) | [mapLast](#maplast) | [negate](#negate)
[pluckDistinct](#pluckdistinct) | [scanLatestFrom](#scanlatestfrom) | [truthy](#truthy) | [withMergeMap](#withmergemap)
[withSwitchMap](#withswitchmap) | [](#) | [](#) | [](#)

# Utilities

Here is a list of utility functions that you can use from this library.

Operators | Operators | Operators | Operators
-----------|-----------|-----------|-----------
[combineEarliest](#combineearliest) | [mergeChain](#mergechain) | [mergeDelayError](#mergedelayerror) | [mergeTrim](#mergetrim)
[roundRobin](#roundrobin) | [switchChain](#switchchain) | [toObservable](#toobservable) | [windowResize](#windowresize)


## Operators List

### after

Emits the value that came after the value that passed the provided condition.

This operator has the following limitations:

- This operator will never emit if the observable only emits one or fewer values.
- This operator will never emit the first value.
- If no values pass the provided condition, then nothing is emitted.

```typescript
after<T>(cond: (current: T, next: T) => boolean): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of('starting', 'started', 'error', 'restarting').pipe(
    after(v => v === 'error')
).subscribe(v => console.log(v)); // prints "restarting"
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/after.ts)] [[up](#operators)]

----
### before

Emits the value that came before the value that passed the provided condition.

This operator has the following limitations:

- This operator will never emit if the observable only emits one or fewer values.
- This operator will never emit the last value.
- If no values pass the provided condition, then nothing is emitted.

```typescript
before<T>(cond: (current: T, prev: T) => boolean): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of('starting', 'started', 'error', 'restarting').pipe(
    before(v => v === 'error')
).subscribe(v => console.log(v)); // prints "started"
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/before.ts)] [[up](#operators)]

----
### beforeError

Emits an array of values that came before an error and silences the error. You can specify how many values to emit upon an error (the default is `1`).
The emitted array contains the most recent value first followed by older values.

> This is a good operator for debugging to see what values preceded an error. 

Example:

```typescript
of('starting','started','restarting').pipe(
    map(n => {
        if(n === 'restarting') { throw new Error() }
        return n;
    }),
    beforeError()
}).subscribe(v => console.log(v)); // prints ["started"]
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/beforeError.ts)] [[up](#operators)]

----
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
### distinctArray

Only emits when an array contains different values than the last and ignores the order of those values. The array must contain sortable
values otherwise the results are unpredictable.

> This operator sorts each array value before comparison.

```typescript
distinctArray<T>(): MonoTypeOperatorFunction<T[]>
```

Example:

```typescript
of([1,2,3], [3,2,1], [1, 3, 2], [4, 5, 6], [1, 2, 3]).pipe(
    distinctArray()
).subscribe(v => console.log(v));
// prints
// [1,2,3]
// [4,5,6]
// [1,2,3]
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/distinct-array.ts)] [[up](#operators)]

----
### distinctDeepEqual

Only emits when the current value is deeply different than the last. Two values that have different references, but contain the
same properties will be compared to be the same. This is the same for arrays, nested objects, dates and regular expressions.
 
```typescript
distinctDeepEqual<T>(): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of([1,2],[2,1],{a:1, b:1},{b:1, a:1}).pipe(
    distinctDeepEqual()
).subscribe(v => console.log(v));
// prints
// [1,2]
// {a:1, b:1}
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/distinct-deep-equal.ts)] [[up](#operators)]

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
### historyBuffer

Emits an array that starts with the current value followed by previous values. Pass a count number to limit the
length of the array, otherwise the array will continue to grow in length until the observable completes. 

```typescript
historyBuffer<T>(count?: number): OperatorFunction<T, T[]>
```

Example:

```typescript
of(1,2,3,4,5).pipe(
   bufferHistory(3)
).subscribe(v => console.log(v));
// [1]
// [2,1]
// [3,2,1]
// [4,3,2]
// [5,4,3]
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/historyBuffer.ts)] [[up](#operators)]

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
### loadFirst

Emits objects that describe the loading of data from a remote resource (like making a HTTP request). The objects
contain the *status* property which can be either `"start"`, `"value"` or `"error"`, and a *value* property which
holds the first data emitted by the outer observable.
 
> This operator only reads the *first* value from the outer observable, and then completes.

There is always a *start* object emitted first followed by either a *value* or *error* object. The *error* object
can be a thrown error or the result of the outer observable *completing* without any results.

```typescript
export interface LoadFirst<T> {
    status: string;
    value: T | undefined;
}

loadFirst<T, S, E>(start?: S, empty?: E): OperatorFunction<T, LoadFirst<T | S | E>>
```

Example:

```typescript
of("Hello World").pipe(
    loadFirst()
).subscribe(v => console.log(v));
// prints 
// {state: "start", value: undefined}
// {state: "value", value: "Hello World"}
```

You can use this operator to make loading indicators for Angular components.

Example:

```typescript
import {loadFirst, LoadFirst} from '@reactgular/observable/operators';

@Component({
    selector: 'example',
    template: `
        <ng-container *ngIf="load$ | async as load" [ngSwitch]="load.status">
            <div *ngSwitchCase='"start"'>
                Please wait while loading...
            </div>
            <div *ngSwitchCase='"value"'>
                {{load.value}}
            </div>
            <div *ngSwitchCase='"error"'>
                There was an error loading data...
            </div>
        </ng-container>`
})
export class ExampleComponent implements OnInit {
    public load$: Observable<LoadFirst<any>>;
   
    public constructor(private http: HttpClient) { }
   
    public ngOnInit() {
        this.data$ = this.http
            .get('https://example.com/api')
            .pipe(loadFirst());    
    }
}
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/load-first.ts)] [[up](#operators)]

----
### mapFirst

Applies a given `project` function to the first value emitted by the source Observables, and emits the resulting value. Only the first
value is projected and subsequent values are emitted without projection.

> This operator is an alias for doing `map((value, indx) => indx === 0 ? project(value) : value)` 

Example:

```typescript
of(1,2,3,4).pipe(
    mapFirst(v => v * 100)
).subscribe(v => console.log(v)); 
// 100
// 2
// 3
// 4
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/map-first.ts)] [[up](#operators)]

----
### mapLast

Applies a given `project` function to the last value emitted by the source Observables, and emits the resulting value. Only the last
value is projected and previous values are emitted without projection. This operator uses [pairwise()](https://rxjs.dev/api/operators/pairwise) 
internally and emits each value only when a next value is emitted or the source observable completes.

> If you use both `mapFirst()` and `mapLast()` on an observable that emits only a single value and completes, then both operators will project on the same value.

This operator has the following limitations:

- Each emitted value is the previous value from the source observable, and the last value is flushed out when the source completes.
- Projects the last value even if the observable emits only a single value and completes.

```typescript
mapLast<T, R>(project: (value: T) => R): OperatorFunction<T, T | R>
```

Example:

```typescript
of(1,2,3).pipe(
    mapLast(v => v + 1000)
).subscribe(v => console.log(v));
// 1
// 2
// 1003
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/map-last.ts)] [[up](#operators)]

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
### scanLatestFrom

Applies an accumulator function over the source Observable, and returns each intermediate result. The seed value is
the latest value from the second observable. If the source observable emits multiple values before the second observable emits a value, then the latest
from both observables will be used instead. Accumulated values are discarded when the second observable emits a seed value. 

> Accumulated values are discarded when the second observable emits a seed value, and a new value is calculate using the accumulator function.

Accumulator function parameters:

- `acc` is the accumulated value and is either the *latest* value from the second observable or the previous value from the accumulator.
- `value` is the value from the source observable.
- `index` is the offset number from the source observable.
- `reset` is *true* when the `acc` parameter has been reset by the second observable emitting a value.

```typescript
scanLatestFrom<T, A, R>(accumulator: (acc: A | R, value: T, index: number, reset: boolean) => R, latest: Observable<A>): OperatorFunction<T, R>
```

[[source](https://github.com/reactgular/observables/blob/master/src/operators/scan-latest-from.ts)] [[up](#operators)]

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
### mergeChain

When the source observable emits a value it is passed to the next *switchTo* function which returns another observable, and the
value from that observable is passed onto the next *switchTo* function. It creates a new observable that emits an array of
all values emitted from chained observables. 

> Uses [mergeMap()](https://rxjs.dev/api/operators/mergeMap) internally to chain the functions together.

```typescript
mergeChain<T, R>(source: Observable<T>, ...mergeTo: Array<(...values: any[]) => Observable<any>>): Observable<R>
```

Example:

```typescript
mergeChain(
    store.select('company'),
    (company) => store.selectPriceChanges(company.id),
    (price, company) => store.selectPriceUpdates(price.id)
).subscribe(([changes, price, company]) => console.log(changes, price, company));
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/merge-chain.ts)] [[up](#utilities)]

----
### mergeDelayError

Creates an output observable which concurrently emits all values from every
given input observable, but delays any thrown errors until all observables have 
completed, and throws the first error.

> All observables must complete before any awaiting error are thrown.

```typescript
mergeDelayError<T>(...observables: Observable<T>[]): Observable<T>
```

Example:

```typescript
mergeDelayError(
    of(1,2,3),
    throwError('ERROR')
).subscribe(
    v => console.log(v),
    err => console.error(err)
);
// prints
// 1
// 2
// 3
// ERROR
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/merge-delay-error.ts)] [[up](#utilities)]

----
### mergeTrim

Creates an output observable which concurrently emits all values from every 
given input observable until any observable completes.

```typescript
mergeTrim<T>(...observables: Observable<T>[]): Observable<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/merge-trim.ts)] [[up](#utilities)]

----
### roundRobin

Creates an output observable which emits values from each observable in a round robin sequence. Where the first observable must emit
a value, before the next observable emits a value and starts over after all observables have emitted a value.

```typescript
function roundRobin<T>(...observables: Observable<T>[]): Observable<T>
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/round-robin.ts)] [[up](#utilities)]

----
### switchChain

When the source observable emits a value it is passed to the next *switchTo* function which returns another observable, and the
value from that observable is passed onto the next *switchTo* function. It creates a new observable that emits an array of
all values emitted from chained observables. 

> Uses [switchMap()](https://rxjs.dev/api/operators/switchMap) internally to chain the functions together.

```typescript
switchChain<T, R>(source: Observable<T>, ...switchTo: Array<(...values: any[]) => Observable<any>>): Observable<R>
```

Example:

```typescript
switchChain(
    http.get('/user'),
    (user) => http.get(`/projects/${user.projectId}`),
    (project, user) => http.get(`/company/${project.companyId}`),
    (company, project, user) => http.get(`/brand/${company.brandId}`)
).subscribe(([brand, company, project, user]) => console.log(brand, company, project, user));
```

[[source](https://github.com/reactgular/observables/blob/master/src/utils/switch-chain.ts)] [[up](#utilities)]

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
