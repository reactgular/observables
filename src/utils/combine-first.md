When all observables have emitted their first value, then emit an array of those values.

This operator is the opposite of [combineLatest()](https://rxjs.dev/api/index/function/combineLatest).

> Be aware that `combineFirst` will not emit an inital value until each observable emits a first value.

```typescript
combineFirst<O extends Observable<any>, R>(...observables: O[]): Observable<R>
```

Example:

```typescript
combineFirst([
    of(1, 2, 3, 4),
    of(5, 6, 7, 8),
    of(9, 10, 11, 12)
]).subscribe(v => console.log(v)); // prints [1, 5, 9]
```
