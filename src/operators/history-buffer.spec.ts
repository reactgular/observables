import {marbles} from 'rxjs-marbles';
import {historyBuffer} from './history-buffer';

describe('operators/historyBuffer', () => {
    it('should emit a history of values', marbles(m => {
        const source = m.cold('1-2-3-4-5|').pipe(historyBuffer());
        const result = 'a-b-c-d-e|';
        m.expect(source).toBeObservable(result, {
            a: ['1'],
            b: ['2', '1'],
            c: ['3', '2', '1'],
            d: ['4', '3', '2', '1'],
            e: ['5', '4', '3', '2', '1']
        });
    }));

    it('should emit a history with a limited length', marbles(m => {
        const source = m.cold('1-2-3-4-5|').pipe(historyBuffer(3));
        const result = 'a-b-c-d-e|';
        m.expect(source).toBeObservable(result, {
            a: ['1'],
            b: ['2', '1'],
            c: ['3', '2', '1'],
            d: ['4', '3', '2'],
            e: ['5', '4', '3']
        });
    }));

    it('should emit empty arrays if length is 0', marbles(m => {
        const source = m.cold('1-2-3-4-5|').pipe(historyBuffer(0));
        const result = 'a-b-c-d-e|';
        m.expect(source).toBeObservable(result, {
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
