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
