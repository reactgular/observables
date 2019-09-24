The inner observable can emit a *truthy* value to stop the emitting of values from the
outer observable, and emit a *falsy* to resume emitting values.

> Does not emit any values until the inner observable emits a *falsy* value.

```typescript
disabledWhen<T>(disabled$: Observable<boolean>): MonoTypeOperatorFunction<T>
```
