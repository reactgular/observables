import {marbles} from 'rxjs-marbles';
import {beforeError} from './beforeError';

describe('beforeError', () => {
    it('should emit nothing for empty observables', marbles(m => {
        m.expect(m.cold('').pipe(beforeError())).toBeObservable('');
        m.expect(m.cold('|').pipe(beforeError())).toBeObservable('|');
    }));

    it('should emit nothing if no errors', marbles(m => {
        m.expect(m.cold('a-b-c-d-e').pipe(beforeError())).toBeObservable('');
        m.expect(m.cold('(abcde)').pipe(beforeError())).toBeObservable('');
        m.expect(m.cold('a-b-c-d-e|').pipe(beforeError())).toBeObservable('---------|');
    }));

    it('should emit the previous value upon an error', marbles(m => {
        const source = m.cold('a-b-c-d-#').pipe(beforeError());
        const expect = '       --------(a|)';
        m.expect(source).toBeObservable(expect, {a: ['d']});
    }));

    it('should emit the previous 3 values upon an error', marbles(m => {
        const source = m.cold('a-b-c-d-#').pipe(beforeError(3));
        const expect = '       --------(a|)';
        m.expect(source).toBeObservable(expect, {a: ['d', 'c', 'b']});
    }));
});
