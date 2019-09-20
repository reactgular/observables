import {marbles} from 'rxjs-marbles';
import {distinctDeepEqual} from './distinct-deep-equal';

describe('distinctDeepEqual', () => {
    it('should distinguish between values', marbles(m => {
        const source = m.cold('-1--2-2---1-3-|').pipe(distinctDeepEqual());
        const expect = '       -1--2-----1-3-|';
        m.expect(source).toBeObservable(expect);
    }));

    it('should distinguish between array values', marbles(m => {
        const values = {a: [1, 2, 3], b: [1, 2, 3], c: [4, 5, 6]};
        const source = m.cold('-a--b-b---c-c-|', values).pipe(distinctDeepEqual());
        const expect = '       -a--------c---|';
        m.expect(source).toBeObservable(expect, {a: [1, 2, 3], c: [4, 5, 6]});
    }));

    it('should see array orders as being different', marbles(m => {
        const values = {a: [1, 2, 3], b: [1, 2, 3], c: [3, 2, 1]};
        const source = m.cold('-a--b-b---c-c-|', values).pipe(distinctDeepEqual());
        const expect = '       -a--------c---|';
        m.expect(source).toBeObservable(expect, {a: [1, 2, 3], c: [3, 2, 1]});
    }));

    it('should distinguish between object values', marbles(m => {
        const values = {a: {x: 1, y: 2, z: 3}, b: {x: 1, y: 2, z: 3}, c: {x: 4, y: 5, z: 6}};
        const source = m.cold('-a--b-b---c-c-|', values).pipe(distinctDeepEqual());
        const expect = '       -a--------c---|';
        m.expect(source).toBeObservable(expect, {a: {x: 1, y: 2, z: 3}, c: {x: 4, y: 5, z: 6}});
    }));

    it('should ignore the order of object properties', marbles(m => {
        const values = {a: {x: 1, y: 2, z: 3}, b: {z: 3, y: 2, x: 1}, c: {x: 1, z: 3, y: 2}};
        const source = m.cold('-a--b-b---c-c-|', values).pipe(distinctDeepEqual());
        const expect = '       -a------------|';
        m.expect(source).toBeObservable(expect, {a: {x: 1, y: 2, z: 3}});
    }));
});
