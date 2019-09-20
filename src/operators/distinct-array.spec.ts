import {marbles} from 'rxjs-marbles';
import {distinctArray} from './distinct-array';

describe('distinctArray', () => {
    it('should emit unique arrays ignoring order of values', marbles(m => {
        const values = {a: [1, 2, 3], b: [3, 2, 1], c: [5, 6, 7], d: [6, 5, 7], e: [1, 2, 3]};
        const source = m.cold('a-b-c-d-e|', values).pipe(distinctArray());
        const expect = '       a---c---e|';
        m.expect(source).toBeObservable(expect, values);
    }));

    it('should emit arrays if different lengths', marbles(m => {
        const values = {a: [1], b: [1, 2], c: [1, 2, 3], d: [1, 2, 3, 4], e: [1, 2, 3, 4, 5]};
        const source = m.cold('a-b-c-d-e|', values).pipe(distinctArray());
        const expect = '       a-b-c-d-e|';
        m.expect(source).toBeObservable(expect, values);
    }));

    it('should not deeply match arrays', marbles(m => {
        const values = {a: [1, [1]], b: [1, [1]]};
        const source = m.cold('a-b|', values).pipe(distinctArray());
        const expect = '       a-b|';
        m.expect(source).toBeObservable(expect, values);
    }));

    it('should not deeply match object values', marbles(m => {
        const values = {a: [1, {a: 1}], b: [1, {a: 1}]};
        const source = m.cold('a-b|', values).pipe(distinctArray());
        const expect = '       a-b|';
        m.expect(source).toBeObservable(expect, values);
    }));

    it('should not distinct values that are not arrays', marbles(m => {
        const source = m.cold('a-a-c-c-e|').pipe(distinctArray());
        const expect = '       a-a-c-c-e|';
        m.expect(source).toBeObservable(expect);
    }));
});
