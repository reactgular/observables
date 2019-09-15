import {of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {counter} from './counter';

describe(counter.name, () => {
    it('should increment a number for each value', done => {
        of('a', 'b', 'c', 'd', 'e').pipe(
            counter(),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([
            [0, 'a'],
            [1, 'b'],
            [2, 'c'],
            [3, 'd'],
            [4, 'e']
        ]));
    });
});
