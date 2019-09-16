Increments a counter for each emitted value.

```typescript
counter<T>(): OperatorFunction<T, [number, T]>
```

Example:

```typescript
of('a', 'b', 'c', 'd', 'e').pipe(
    counter(),
    toArray()
).subscribe(v => console.log(v)); // prints  [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e']]    
```
