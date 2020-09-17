import {marbles} from 'rxjs-marbles';
import {withSwitchMap} from './with-switch-map';

describe('operators/withSwitchMap', () => {
    it('should emit the outer and inner values', marbles(m => {
        const outer = m.cold('a-(a|)');
        const inner = m.cold('b(b|)');
        const result = '      aaa(a|)';
        const source = outer.pipe(withSwitchMap(() => inner));
        m.expect(source).toBeObservable(result, {a: ['a', 'b']});
    }));
});
