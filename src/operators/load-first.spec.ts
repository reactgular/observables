import {marbles} from 'rxjs-marbles';
import {loadFirst} from './load-first';

describe('trackStatus', () => {
    it('should emit an error if the observable completes without any results', marbles(m => {
        const source = m.cold('|').pipe(loadFirst('starting', 'empty'));
        const expect = '       (se|)';
        m.expect(source).toBeObservable(expect, {
            s: {status: 'start', value: 'starting'},
            e: {status: 'error', value: 'empty'}
        });
    }));

    it('should emit the start value before emitted value', marbles(m => {
        const source = m.cold('v|').pipe(loadFirst());
        const expect = '       (sv|)';
        m.expect(source).toBeObservable(expect, {
            s: {status: 'start', value: undefined},
            v: {status: 'value', value: 'v'}
        });
    }));

    it('should only emit the first value', marbles(m => {
        const source = m.cold('1234|').pipe(loadFirst());
        const expect = '       (sv|)';
        m.expect(source).toBeObservable(expect, {
            s: {status: 'start', value: undefined},
            v: {status: 'value', value: '1'}
        });
    }));

    it('should emit on error', marbles(m => {
        const source = m.cold('#').pipe(loadFirst());
        const expect = '       (se|)';
        m.expect(source).toBeObservable(expect, {
            s: {status: 'start', value: undefined},
            e: {status: 'error', value: 'error'}
        });
    }));

    it('should emit first value before errors', marbles(m => {
        const source = m.cold('1------#').pipe(loadFirst());
        const expect = '       (sv|)';
        m.expect(source).toBeObservable(expect, {
            s: {status: 'start', value: undefined},
            v: {status: 'value', value: '1'}
        });
    }));

    it('should emit start before delay of first value', marbles(m => {
        const source = m.cold('  10s -v   10s |').pipe(loadFirst());
        const expect = '       s 10s (v|)      ';
        m.expect(source).toBeObservable(expect, {
            s: {status: 'start', value: undefined},
            v: {status: 'value', value: 'v'}
        });
    }));
});
