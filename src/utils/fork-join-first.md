Accepts a collection of observables, and emits the first value from
all observables as a single value.

Observables can be an `Array` or an `Object` map of observables.

> If an inner observable never emits, then `forkJoinFirst` will never emit a value.
