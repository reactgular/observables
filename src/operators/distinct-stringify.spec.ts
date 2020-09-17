import {marbles} from 'rxjs-marbles';
import {distinctStringify} from './distinct-stringify';

describe('operators/distinctStringify', () => {
    it('should not emit duplicate arrays', marbles(m => {
        const o$ = m.cold('a-b-c-d-e|', {
            a: [1, 2, 3],
            b: [1, 2, 3],
            c: [3, 4, 5],
            d: [6, 7, 8],
            e: [6, 7, 8]
        }).pipe(distinctStringify());
        const result = 'a---c-d--|';
        m.expect(o$).toBeObservable(result, {
            a: [1, 2, 3],
            c: [3, 4, 5],
            d: [6, 7, 8]
        });
    }));

    it('should not emit duplicate objects', marbles(m => {
        const o$ = m.cold('a-b-c-d-e|', {
            a: {x: 0},
            b: {x: 0},
            c: {a: 0, b: 2},
            d: {a: 0, b: 2},
            e: {a: 1, b: 2}
        }).pipe(distinctStringify());
        const result = 'a---c---e|';
        m.expect(o$).toBeObservable(result, {
            a: {x: 0},
            c: {a: 0, b: 2},
            e: {a: 1, b: 2}
        });
    }));

    it('should emit objects with different property order as different', marbles(m => {
        const o$ = m.cold('a-b-c|', {
            a: {a: 1, b: 2, c: 2},
            b: {c: 2, b: 2, a: 1},
            c: {a: 1, b: 2, c: 2}
        }).pipe(distinctStringify());
        const result = 'a-b-c|';
        m.expect(o$).toBeObservable(result, {
            a: {a: 1, b: 2, c: 2},
            b: {c: 2, b: 2, a: 1},
            c: {a: 1, b: 2, c: 2}
        });
    }));

    it('should emit arrays with different order', marbles(m => {
        const o$ = m.cold('a-b-c|', {
            a: [1, 2, 3],
            b: [3, 2, 1],
            c: [1, 2, 3]
        }).pipe(distinctStringify());
        const result = 'a-b-c|';
        m.expect(o$).toBeObservable(result, {
            a: [1, 2, 3],
            b: [3, 2, 1],
            c: [1, 2, 3]
        });
    }));
});
