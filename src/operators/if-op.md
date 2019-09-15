Apply an operator based on a condition. This operator only adds another operator when the
condition is *true*. When the condition is *false* the source observable is not modified.

```typescript
function ifOp<T, R>(cond: boolean, operator: OperatorFunction<T, R>): OperatorFunction<T, T | R>
```

Examples:

Creates an observable of Window resize events with optional debouncing.

```typescript
function windowResize(debounce?: number) {
   return fromEvent(window, 'resize').pipe(
      ifOp(Boolean(debounce), debounceTime(debounce))
   );
}
```

If you are looking to apply two different operators based upon a conditional *if/else*, then you can use
a simple `?:` condition in the `pipe()` chain.

```typescript
example$.pipe(
   cond ? switchMap(project) : mergeMap(project)
);
```
