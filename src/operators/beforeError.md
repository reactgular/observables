Emits an array of values that came before an error. You can specify how many values to emit upon an error (the default is `1`).
The emitted array contains the most recent value first followed by older values.

> This is a good operator for debugging to see what values preceded an error. 

Example:

```typescript
of('starting','started','restarting').pipe(
    map(n => {
        if(n === 'restarting') { throw new Error() }
        return n;
    }),
    beforeError()
}).subscribe(v => console.log(v)); // prints ["started"]
```
