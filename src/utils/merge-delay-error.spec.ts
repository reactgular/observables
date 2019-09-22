import {marbles} from 'rxjs-marbles';
import {mergeDelayError} from './merge-delay-error';

describe('mergeDelayError', () => {
    it('should emit error after all observables complete', marbles(m => {
        const o1 = m.cold('a---b---c--|');
        const o2 = m.cold('--1---2---3|');
        const o3 = m.cold('#');
        const expect = '   a-1-b-2-c-3#';
        const source = mergeDelayError(o1, o2, o3);
        m.expect(source).toBeObservable(expect);
    }));

    it('should emit the first error after all observables complete', marbles(m => {
        const o1 = m.cold('a---b---c--|');
        const o2 = m.cold('--1---2#', undefined, 'SECOND');
        const o3 = m.cold('#', undefined, 'FIRST');
        const expect = '   a-1-b-2-c--#';
        const source = mergeDelayError(o1, o2, o3);
        m.expect(source).toBeObservable(expect, undefined, 'FIRST');
    }));

    // it('should complete when first observable completes', marbles(m => {
    //     const o1 = m.cold('a-----b-c-d');
    //     const o2 = m.cold('1-----2-3-4');
    //     const o3 = m.cold('x----|');
    //     const expect = '   (a1x)|';
    //     const source = mergeDelayError(o1, o2, o3);
    //     m.expect(source).toBeObservable(expect);
    // }));
    //
    // it('should emit values from all observables', marbles(m => {
    //     const o1 = m.cold('a-----b-----c----|');
    //     const o2 = m.cold('1-----2-----3----|');
    //     const o3 = m.cold('x-----y-----z----|');
    //     const expect = '   (a1x)-(b2y)-(c3z)|';
    //     const source = mergeDelayError(o1, o2, o3);
    //     m.expect(source).toBeObservable(expect);
    // }));
    //
    // it('should emit values no matter the order', marbles(m => {
    //     const o1 = m.cold('a---------b-----c|');
    //     const o2 = m.cold('--1-----2-----3--|');
    //     const o3 = m.cold('----x-y-----z----|');
    //     const expect = '   a-1-x-y-2-b-z-3-c|';
    //     const source = mergeDelayError(o1, o2, o3);
    //     m.expect(source).toBeObservable(expect);
    // }));
    //
    // it('should stop on first error', marbles(m => {
    //     const o1 = m.cold('a---------b-----c|');
    //     const o2 = m.cold('--1-----2-----3--|');
    //     const o3 = m.cold('----x-y-----#');
    //     const expect = '   a-1-x-y-2-b-#';
    //     const source = mergeDelayError(o1, o2, o3);
    //     m.expect(source).toBeObservable(expect);
    // }));
});
