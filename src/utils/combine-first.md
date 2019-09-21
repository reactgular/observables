When all observables have emitted their first value, then emit an array of those values and complete.

This operator uses [combineLatest()](https://rxjs.dev/api/index/function/combineLatest) internally, but only 
firsts the first value from each observable.

> Be aware that `combineFirst` will not emit a initial value until each observable emits a first value.

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
