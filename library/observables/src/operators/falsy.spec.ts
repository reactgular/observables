import {of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {falsy} from './falsy';

describe(falsy.name, () => {
    it('should emit only falsy values', done => {
        of(1, 0, false, true, {}, '').pipe(
            falsy(),
            toArray(),
            finalize(() => done())
        ).subscribe(value => expect(value).toEqual([0, false, '']));
    });
});
