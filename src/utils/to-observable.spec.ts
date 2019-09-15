import {isObservable, Observable, of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {toObservable} from './to-observable';

describe(toObservable.name, () => {
    it('should create observable for literal values', done => {
        const $ = toObservable('house');
        expect(isObservable($)).toBeTruthy();
        $.pipe(
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual(['house']));
    });

    it('should not modify an observable', () => {
        const $1 = of('house');
        const $2 = toObservable($1);
        expect($2).toBe($1);
    });

    it('should emit undefined', done => {
        const $ = toObservable(undefined);
        expect(isObservable($)).toBeTruthy();
        $.pipe(
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([undefined]));
    });

    it('should emit an array', done => {
        const $: Observable<number[]> = toObservable([1, 2, 3, 4]);
        expect(isObservable($)).toBeTruthy();
        $.pipe(
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([[1, 2, 3, 4]]));
    });
});
