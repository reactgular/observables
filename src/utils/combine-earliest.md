Whenever any input observable emits a value, it computes a formula using the latest
values from all the inputs, if any input has not yet emitted a value then `undefined`
is used instead, and the observable emits an array of all those values.

Unlike [combineLatest()](https://rxjs.dev/api/index/function/combineLatest) which does not emit a value until
all observables emits at least one value. The `combineEarliest()` emits immediately upon the
first observable that emits a value substituting `undefined` for any awaiting values from the
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
