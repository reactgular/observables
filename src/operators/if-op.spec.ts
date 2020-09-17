import {marbles} from 'rxjs-marbles';
import {mapTo} from 'rxjs/operators';
import {ifOp} from './if-op';

describe('operators/ifOp', () => {
    it('should apply the operator when true', marbles(m => {
        const o$ = m.cold('a-b-c|').pipe(ifOp(true, mapTo('Hello')));
        const result = '   a-b-c|';
        m.expect(o$).toBeObservable(result, {a: 'Hello', b: 'Hello', c: 'Hello'});
    }));

    it('should not apply the operator when false', marbles(m => {
        const o$ = m.cold('a-b-c|').pipe(ifOp(false, mapTo('Hello')));
        const result = '   a-b-c|';
        m.expect(o$).toBeObservable(result, {a: 'a', b: 'b', c: 'c'});
    }));
});
