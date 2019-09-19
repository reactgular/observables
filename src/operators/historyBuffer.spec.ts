import {marbles} from 'rxjs-marbles';
import {historyBuffer} from './historyBuffer';

describe('historyBuffer', () => {
    it('should emit a history of values', marbles(m => {
        const source = m.cold('1-2-3-4-5|').pipe(historyBuffer());
        const expect = 'a-b-c-d-e|';
        m.expect(source).toBeObservable(expect, {
            a: ['1'],
            b: ['2', '1'],
            c: ['3', '2', '1'],
            d: ['4', '3', '2', '1'],
            e: ['5', '4', '3', '2', '1']
        });
    }));

    it('should emit a history with a limited length', marbles(m => {
        const source = m.cold('1-2-3-4-5|').pipe(historyBuffer(3));
        const expect = 'a-b-c-d-e|';
        m.expect(source).toBeObservable(expect, {
            a: ['1'],
            b: ['2', '1'],
            c: ['3', '2', '1'],
            d: ['4', '3', '2'],
            e: ['5', '4', '3']
        });
    }));

    it('should emit empty arrays if length is 0', marbles(m => {
        const source = m.cold('1-2-3-4-5|').pipe(historyBuffer(0));
        const expect = 'a-b-c-d-e|';
        m.expect(source).toBeObservable(expect, {
            a: [],
            b: [],
            c: [],
            d: [],
            e: []
        });
    }));

    it('should emit nothing if observable is empty', marbles(m => {
        m.expect(m.cold('').pipe(historyBuffer())).toBeObservable('');
        m.expect(m.cold('|').pipe(historyBuffer())).toBeObservable('|');
        m.expect(m.cold('#').pipe(historyBuffer())).toBeObservable('#');
    }));
});
