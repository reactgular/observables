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
