import {withSwitchMap} from './with-switch-map';
import {expect$} from '../tests/observable.helper';
import {of} from 'rxjs';

describe(withSwitchMap.name, () => {
    it('should emit both values', () => {
        expect$(of('a', 'b').pipe(withSwitchMap(() => of(1, 2)))).toEqual([
            ['a', 1],
            ['a', 2],
            ['b', 1],
            ['b', 2]
        ]);
    });
});
