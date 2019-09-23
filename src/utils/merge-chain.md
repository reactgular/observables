When the source observable emits a value it is passed to the next *switchTo* function which returns another observable, and the
value from that observable is passed onto the next *switchTo* function. It creates a new observable that emits an array of
all values emitted from chained observables. 

> Uses [mergeMap()](https://rxjs.dev/api/operators/mergeMap) internally to chain the functions together.

```typescript
mergeChain<T, R>(source: Observable<T>, ...mergeTo: Array<(...values: any[]) => Observable<any>>): Observable<R>
```

Example:

```typescript
mergeChain(
    store.select('company'),
    (company) => store.selectPriceChanges(company.id),
    (price, company) => store.selectPriceUpdates(price.id)
).subscribe(([changes, price, company]) => console.log(changes, price, company));
```
