import {of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {truthy} from './truthy';

describe(truthy.name, () => {
    it('should emit only true values', done => {
        of(1, 0, false, true, {}, '').pipe(
            truthy(),
            toArray(),
            finalize(() => done())
        ).subscribe(value => expect(value).toEqual([1, true, {}]));
    });
});
