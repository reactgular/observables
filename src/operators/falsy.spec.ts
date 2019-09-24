import {marbles} from 'rxjs-marbles';
import {falsy} from './falsy';

describe('falsy', () => {
    it('should emit only falsy values', marbles(m => {
        const values = {a: 1, b: 0, c: false, d: true, e: {}, f: ''};
        const o$ = m.cold('a-b-c-d-e-f|', values).pipe(falsy());
        const result = '   --b-c-----f|';
        m.expect(o$).toBeObservable(result, {b: 0, c: false, f: ''});
    }));
});
