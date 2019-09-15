import {of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {distinctStringify} from './distinct-stringify';

describe(distinctStringify.name, () => {
    it('should not emit duplicate numbers', done => {
        of(1, 2, 2, 4, 4, 5, 6, 6, 7).pipe(
            distinctStringify(),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 2, 4, 5, 6, 7]));
    });

    it('should not emit duplicate strings', done => {
        of('one', 'two', 'two', 'four', 'four', 'five', 'six', 'six', 'seven').pipe(
            distinctStringify(),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual(['one', 'two', 'four', 'five', 'six', 'seven']));
    });

    it('should not emit duplicate number arrays', done => {
        of(
            [1, 2, 3],
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [7, 8, 9]
        ).pipe(
            distinctStringify(),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]));
    });

    it('should not emit duplicate objects', done => {
        of(
            {x: 0},
            {x: 0},
            {x: 1},
            {x: 1},
            {x: 1},
            {a: 0, b: 2},
            {a: 0, b: 2},
            {a: 1, b: 2}
        ).pipe(
            distinctStringify(),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([
            {x: 0},
            {x: 1},
            {a: 0, b: 2},
            {a: 1, b: 2}
        ]));
    });

});
