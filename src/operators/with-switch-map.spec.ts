import {marbles} from 'rxjs-marbles';
import {withSwitchMap} from './with-switch-map';

describe('withSwitchMap', () => {
    it('should emit the outer and inner values', marbles(m => {
        const outer = m.cold('a-(a|)');
        const inner = m.cold('b(b|)');
        const expected = '    aaa(a|)';
        const source = outer.pipe(withSwitchMap(() => inner));
        m.expect(source).toBeObservable(expected, {a: ['a', 'b']});
    }));
});
