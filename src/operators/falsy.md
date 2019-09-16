Emits only *falsy* values. Performs a `filter(v => !v)` operator internally.

```typescript
falsy<T>(): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of(0, "Hello", false, [1,2], "")
    .pipe(falsy())
    .subscribe(v => console.log(v));

// 0
// false
// ""
```
