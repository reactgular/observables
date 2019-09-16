Emits all items emitted by the source Observable that are distinct by comparison using `JSON.stringify()` on each value.

```typescript
distinctStringify<T>(): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of([1,2,3], [1,2,3], {a: 1}, {a: 1}, {a: 1, b: 1}, "one", "one", "two")
    .pipe(distinctStringify())
    .subscribe(v => console.log(v));

// [1,2,3]
// {a: 1}
// {a: 1, b: 1}
// "one"
// "two"
``` 
