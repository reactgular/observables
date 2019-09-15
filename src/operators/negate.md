Maps *truthy* values to `false`, and *falsy* values to `true`. Performs a `map(v => !v)` internally.

```typescript
negate<T>(): OperatorFunction<T, boolean>
```
