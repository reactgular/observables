import {marbles} from 'rxjs-marbles';
import {trackStatus} from './track-status';

describe('trackStatus', () => {
    it('should emit a start status', marbles(m => {
        const o$ = m.cold('|').pipe(trackStatus());
        const expect = '(a|)';
        m.expect(o$).toBeObservable(expect, {a: {status: 'start', value: undefined}});
    }));

    it('should emit a start status with a value', marbles(m => {
        const o$ = m.cold('').pipe(trackStatus('Hello World'));
        const expect = 'a';
        m.expect(o$).toBeObservable(expect, {a: {status: 'start', value: 'Hello World'}});
    }));

    it('should emit a start status before value status', marbles(m => {
        const o$ = m.cold('a----b-c').pipe(trackStatus());
        const expect = '   (ab)-c-d';
        m.expect(o$).toBeObservable(expect, {
            a: {status: 'start', value: undefined},
            b: {status: 'value', value: 'a'},
            c: {status: 'value', value: 'b'},
            d: {status: 'value', value: 'c'}
        });
    }));

    it('should emit a start value before an error value', marbles(m => {
        const o$ = m.cold('#').pipe(trackStatus());
        const expect = '(ab|)';
        m.expect(o$).toBeObservable(expect, {
            a: {status: 'start', value: undefined},
            b: {status: 'error', value: 'error'}
        });
    }));
});
