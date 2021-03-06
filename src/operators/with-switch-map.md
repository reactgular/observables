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
