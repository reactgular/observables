Emits changes in the window size with optional debounce time.

```typescript
windowResize(debounce?: number, wnd?: Window): Observable<{ innerWidth: number, innerHeight: number }>
```

Example:

Creates an observable of the window aspect ratio.

```typescript
const aspect$ = windowResize(250).pipe(
   map(({innerWidth, innerHeight}) => innerWidth / innerHeight)
);
```
