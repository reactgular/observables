import {marbles} from 'rxjs-marbles';
import {truthy} from './truthy';

describe('operators/truthy', () => {
    it('should emit only truthy values', marbles(m => {
        const values = {a: 1, b: 0, c: false, d: true, e: {}, f: NaN, g: ''};
        const e1 = m.cold('a-b-c-d-e-f-g', values).pipe(truthy());
        const result = '   a-----d-e----';
        m.expect(e1).toBeObservable(result, {a: 1, d: true, e: {}});
    }));
});
