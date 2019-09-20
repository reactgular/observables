Only emits when the current value is deeply different than the last. Two values that have different references, but contain the
same properties will be compared to be the same. This is the same for arrays, nested objects, dates and regular expressions.

 
> distinctDeepEqual() uses [fastDeepEqual](https://github.com/epoberezkin/fast-deep-equal) comparison to see if two values have changed.

```typescript
distinctDeepEqual<T>(): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of([1,2],[2,1],{a:1, b:1},{b:1, a:1}).pipe(
    distinctDeepEqual()
).subscribe(v => console.log(v));
// prints
// [1,2]
// {a:1, b:1}
```
