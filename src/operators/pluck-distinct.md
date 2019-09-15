Maps each source value (an object) to its specified nest property,
and only emits distinct changes. It is the same as applying a [pluck()](https://rxjs.dev/api/operators/pluck)
followed by a [distinctUntilChanged()](https://rxjs.dev/api/operators/distinctUntilChanged).

```typescript
function pluckDistinct<T, R>(...properties: string[]): OperatorFunction<T, R>
```

Example:

```typescript
from([
    {name: 'John Smith'},
    {name: 'John Smith'},
    {name: 'Jane Doe'},
    {name: 'Jane Doe'}
]).pipe(
    pluckDistinct('name'),
    toArray()
).subscribe(v => console.log(v)); // prints ['John Smith', 'Jane Doe']
```
