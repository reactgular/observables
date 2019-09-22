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
