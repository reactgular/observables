Maps *truthy* values to `false`, and *falsy* values to `true`. Performs a `map(v => !v)` internally.

```typescript
negate<T>(): OperatorFunction<T, boolean>
```

Example:

```typescript
of(0, "Hello", false, [1,2,3], "").pipe(
    negate(),
    toArray()
).subscribe(v => console.log(v));
// prints [true, false, true, false, true]
```
