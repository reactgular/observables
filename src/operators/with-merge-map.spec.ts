import {marbles} from 'rxjs-marbles';
import {withMergeMap} from './with-merge-map';

describe('operators/withMergeMap', () => {
    it('should emit the outer and inner values', marbles(m => {
        const outer = m.cold('a-(a|)');
        const inner = m.cold('b(b|)');
        const result = '      aaa(a|)';
        const source = outer.pipe(withMergeMap(() => inner));
        m.expect(source).toBeObservable(result, {a: ['a', 'b']});
    }));
});
