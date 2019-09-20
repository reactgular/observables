Applies a given `project` function to the last value emitted by the source Observables, and emits the resulting value. Only the last
value is projected and previous values are emitted without projection. This operator uses [pairwise()](https://rxjs.dev/api/operators/pairwise) 
internally and emits each value only when a next value is emitted or the source observable completes.

This operator has the following limitations:

- Each emitted value is the previous value from the source observable, and the last value is flushed out when the source completes.
- If the source emits only one value and does not complete, then no values are emitted.

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
