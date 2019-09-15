Increments a counter for each emitted value.

```typescript
function counter<T>(): OperatorFunction<T, [number, T]>
```

Example:

```typescript
of('a', 'b', 'c', 'd', 'e').pipe(
    counter(),
    toArray()
).subscribe(v => console.log(v)); // prints  [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e']]    
```
