import {of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {withSwitchMap} from './with-switch-map';

describe(withSwitchMap.name, () => {
    it('should emit both values', async () => {
        const v = await of('a', 'b').pipe(
            withSwitchMap(() => of(1, 2)),
            toArray()
        ).toPromise();
        expect(v).toEqual([
            ['a', 1],
            ['a', 2],
            ['b', 1],
            ['b', 2]
        ]);
    });
});
