import {toObservable} from './to-observable';
import {isObservable, Observable, of} from 'rxjs';
import {expect$} from '../../tests/observable.helper';

describe(toObservable.name, () => {
    it('should create observable for literal values', () => {
        const $ = toObservable('house');
        expect(isObservable($)).toBeTruthy();
        expect$($).toEqual(['house']);
    });

    it('should not modify an observable', () => {
        const $1 = of('house');
        const $2 = toObservable($1);
        expect($2).toBe($1);
    });

    it('should emit undefined', () => {
        const $ = toObservable(undefined);
        expect(isObservable($)).toBeTruthy();
        expect$($).toEqual([undefined]);
    });

    it('should emit an array', () => {
        const $: Observable<number[]> = toObservable([1, 2, 3, 4]);
        expect(isObservable($)).toBeTruthy();
        expect$($).toEqual([[1, 2, 3, 4]]);
    });
});
