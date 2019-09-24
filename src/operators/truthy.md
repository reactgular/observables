Emits only truthy values. This operator is an alias for `filter(v => Boolean(v))`, but most people write
`filter(Boolean)` because it's shorter. The problem with using `filter(Boolean)` is that the observable
type can change to `Boolean` by TypeScript. So using `truthy()` is a shorter alias for the longer form that persists the
generic type. 

```typescript
truthy<T>(): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of(0, false, [1,2,3], "Hello", "", {}).pipe(
    truthy(),
    toArray()
).subscribe(v => console.log(v));
// prints [[1,2,3], "Hello", {}]
```
