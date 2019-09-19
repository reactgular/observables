Emits the value that came after the value that passed the provided condition.

This operator has the following limitations:

- This operator will never emit if the observable only emits one or fewer values.
- This operator will never emit the first value.
- If no values pass the provided condition, then nothing is emitted.

```typescript
after<T>(cond: (current: T, next: T) => boolean): MonoTypeOperatorFunction<T>
```

Example:

```typescript
of('starting', 'started', 'error', 'restarting').pipe(
    after(v => v === 'error')
).subscribe(v => console.log(v)); // prints "restarting"
```
