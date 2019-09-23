import {marbles} from 'rxjs-marbles';
import {negate} from './negate';

describe('negate', () => {
    it('should invert boolean values', marbles(m => {
        const o$ = m.cold('a-b-c-d|', {a: true, b: false, c: true, d: false}).pipe(negate());
        const result = '   a-b-c-d|';
        m.expect(o$).toBeObservable(result, {a: false, b: true, c: false, d: true});
    }));

    it('should emit false for truthy values', marbles(m => {
        const o$ = m.cold('a-b-c-d-e|', {a: true, b: {}, c: 'Hello', d: 1, e: []}).pipe(negate());
        const result = '   a-b-c-d-e|';
        m.expect(o$).toBeObservable(result, {a: false, b: false, c: false, d: false, e: false});
    }));

    it('should emit true for falsy values', marbles(m => {
        const o$ = m.cold('a-b-c-d-e|', {a: false, b: 0, c: '', d: NaN, e: null, f: undefined}).pipe(negate());
        const result = '   a-b-c-d-e|';
        m.expect(o$).toBeObservable(result, {a: true, b: true, c: true, d: true, e: true, f: true});
    }));
});
