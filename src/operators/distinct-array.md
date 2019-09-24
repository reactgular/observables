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
