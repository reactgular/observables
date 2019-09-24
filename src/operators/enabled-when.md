The inner observable can emit a *falsy* value to stop the emitting of values from the
outer observable, and emit a *truthy* to resume emitting values.

> Does not emit any values until the inner observable emits a *truthy* value.

```typescript
enabledWhen<T>(enabled: Observable<boolean>): MonoTypeOperatorFunction<T>
```
