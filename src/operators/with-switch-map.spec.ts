import {of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {withSwitchMap} from './with-switch-map';

describe(withSwitchMap.name, () => {
    it('should emit both values', done => {
        of('a', 'b').pipe(
            withSwitchMap(() => of(1, 2)),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([
            ['a', 1],
            ['a', 2],
            ['b', 1],
            ['b', 2]
        ]));
    });
});
