Apply an operator based on a condition. This operator only adds another operator when the
condition is *true*. When the condition is *false* the source observable is not modified.

```typescript
ifOp<T, R>(cond: boolean, operator: OperatorFunction<T, R>): OperatorFunction<T, T | R>
```

Examples:

Creates an observable of Window resize events with optional debouncing.

```typescript
windowResize(debounce?: number) {
   return fromEvent(window, 'resize').pipe(
      ifOp(Boolean(debounce), debounceTime(debounce))
   );
}
```

If you are looking to apply two different operators based upon a conditional *if/else*, then you can use
a simple `?:` condition in the `pipe()` chain.

```typescript
function switchOrMerge(cond: boolean): Observable<number> {
    const projector = (value) => of(value).pipe(startWith(99));
    return of(1,2,3).pipe(
       cond ? switchMap(projector) : mergeMap(projector)
    );
}
```
