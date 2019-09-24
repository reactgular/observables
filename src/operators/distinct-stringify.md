Emits all items from the source Observable that are distinct by comparison using `JSON.stringify()` on each value.

> Arrays with same values in different orders will be seen as different, and the same for objects with properties in different order.

```typescript
distinctStringify<T>(): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of([1,2,3], [1,2,3], [3,2,1], {a: 1}, {a: 1}, {a: 1, b: 1}, {b: 1, a: 1}, "one", "one", "two")
    .pipe(distinctStringify())
    .subscribe(v => console.log(v));

// [1,2,3]
// [3,2,1]
// {a: 1}
// {a: 1, b: 1}
// {b: 1, a: 1}
// "one"
// "two"
``` 
