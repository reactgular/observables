Creates an output observable which concurrently emits all values from every 
given input observable until any observable completes.

```typescript
mergeTrim<T>(...observables: Observable<T>[]): Observable<T>
```
