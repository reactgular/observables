Increments a counter for each emitted value.

```typescript
counter<T>(): OperatorFunction<T, [number, T]>
```

Example:

```typescript
of('a', 'b', 'c', 'd').pipe(
    counter()
).subscribe(v => console.log(v));
// [1, 'a']
// [2, 'b']
// [3, 'c']
// [4, 'd']    
```
