Emits an array that starts with the current value followed by previous values. Pass a count number to limit the
length of the array, otherwise the array will continue to grow in length until the observable completes. 

```typescript
historyBuffer<T>(count?: number): OperatorFunction<T, T[]>
```

Example:

```typescript
of(1,2,3,4,5).pipe(
   bufferHistory(3)
).subscribe(v => console.log(v));
// [1]
// [2,1]
// [3,2,1]
// [4,3,2]
// [5,4,3]
```
