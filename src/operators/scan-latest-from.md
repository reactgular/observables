Applies an accumulator function over the source Observable, and returns each intermediate result. The seed value is
the latest value from the second observable. If the source observable emits multiple values before the second observable emits a value, then the latest
from both observables will be used instead. Accumulated values are discarded when the second observable emits a seed value. 

> Accumulated values are discarded when the second observable emits a seed value, and a new value is calculate using the accumulator function.

Accumulator function parameters:

- `acc` is the accumulated value and is either the *latest* value from the second observable or the previous value from the accumulator.
- `value` is the value from the source observable.
- `index` is the offset number from the source observable.
- `reset` is *true* when the `acc` parameter has been reset by the second observable emitting a value.

```typescript
scanLatestFrom<T, A, R>(accumulator: (acc: A | R, value: T, index: number, reset: boolean) => R, latest: Observable<A>): OperatorFunction<T, R>
```
