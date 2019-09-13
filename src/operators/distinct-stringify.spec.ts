import {distinctStringify} from './distinct-stringify';
import {of} from 'rxjs';
import {expect$} from '../tests/observable.helper';

describe(distinctStringify.name, () => {
    it('should not emit duplicate numbers', () => {
        const S1 = of(1, 2, 2, 4, 4, 5, 6, 6, 7).pipe(distinctStringify());
        expect$(S1).toEqual([1, 2, 4, 5, 6, 7]);
    });

    it('should not emit duplicate strings', () => {
        const S1 = of('one', 'two', 'two', 'four', 'four', 'five', 'six', 'six', 'seven').pipe(distinctStringify());
        expect$(S1).toEqual(['one', 'two', 'four', 'five', 'six', 'seven']);
    });

    it('should not emit duplicate number arrays', () => {
        const S1 = of(
            [1, 2, 3],
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [7, 8, 9]
        ).pipe(distinctStringify());
        expect$(S1).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
    });

    it('should not emit duplicate objects', () => {
        const S1 = of(
            {x: 0},
            {x: 0},
            {x: 1},
            {x: 1},
            {x: 1},
            {a: 0, b: 2},
            {a: 0, b: 2},
            {a: 1, b: 2}
        ).pipe(distinctStringify());
        expect$(S1).toEqual([
            {x: 0},
            {x: 1},
            {a: 0, b: 2},
            {a: 1, b: 2}
        ]);
    });

});
