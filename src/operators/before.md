Emits the value that came before the value that passed the provided condition.

This operator has the following limitations:

- This operator will never emit if the observable only emits one or fewer values.
- This operator will never emit the last value.
- If no values pass the provided condition, then nothing is emitted.

```typescript
before<T>(cond: (current: T, prev: T) => boolean): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of('starting', 'started', 'error', 'restarting').pipe(
    before(v => v === 'error')
).subscribe(v => console.log(v)); // prints "started"
```
