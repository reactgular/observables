When the source observable emits a value it is passed to the next *switchTo* function which returns another observable, and the
value from that observable is passed onto the next *switchTo* function. It creates a new observable that emits an array of
all values emitted from chained observables. 

> Uses [switchMap()](https://rxjs.dev/api/operators/switchMap) internally to chain the functions together.

```typescript
switchChain<T, R>(source: Observable<T>, ...switchTo: Array<(...values: any[]) => Observable<any>>): Observable<R>
```

Example:

```typescript
switchChain(
    http.get('/user'),
    (user) => http.get(`/projects/${user.projectId}`),
    (project, user) => http.get(`/company/${project.companyId}`),
    (company, project, user) => http.get(`/brand/${company.brandId}`)
).subscribe(([brand, company, project, user]) => console.log(brand, company, project, user));
```
