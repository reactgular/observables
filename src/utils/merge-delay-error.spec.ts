import {marbles} from 'rxjs-marbles';
import {mergeDelayError} from './merge-delay-error';

describe('utils/mergeDelayError', () => {
    it('should emit error after all observables complete', marbles(m => {
        const o1 = m.cold('a---b---c--|');
        const o2 = m.cold('--1---2---3|');
        const o3 = m.cold('#');
        const result = '   a-1-b-2-c-3#';
        const source = mergeDelayError(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));

    it('should emit the first error after all observables complete', marbles(m => {
        const o1 = m.cold('a---b---c--|');
        const o2 = m.cold('--1---2#', undefined, 'SECOND');
        const o3 = m.cold('#', undefined, 'FIRST');
        const result = '   a-1-b-2-c--#';
        const source = mergeDelayError(o1, o2, o3);
        m.expect(source).toBeObservable(result, undefined, 'FIRST');
    }));

    it('should emit values from all observables', marbles(m => {
        const o1 = m.cold('a-----b-----c----|');
        const o2 = m.cold('1-----2-----3----|');
        const o3 = m.cold('x-----y-----z----|');
        const result = '   (a1x)-(b2y)-(c3z)|';
        const source = mergeDelayError(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));

    it('should emit values no matter the order', marbles(m => {
        const o1 = m.cold('a---------b-----c|');
        const o2 = m.cold('--1-----2-----3--|');
        const o3 = m.cold('----x-y-----z----|');
        const result = '   a-1-x-y-2-b-z-3-c|';
        const source = mergeDelayError(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));
});
