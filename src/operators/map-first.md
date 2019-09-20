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
