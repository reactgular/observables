import {of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {withMergeMap} from './with-merge-map';

describe(withMergeMap.name, () => {
    it('should emit both values', done => {
        of('a', 'b').pipe(
            withMergeMap(() => of(1, 2)),
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
