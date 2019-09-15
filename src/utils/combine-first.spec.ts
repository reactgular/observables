import {of} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {combineFirst} from './combine-first';

describe(combineFirst.name, () => {
    it('should emit only the first values', done => {
        combineFirst([
            of(1, 2, 3, 4),
            of(5, 6, 7, 8),
            of(9, 10, 11, 12)
        ]).pipe(
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 5, 9]));
    });

    it('should emit an empty array', done => {
        combineFirst([]).pipe(
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([]));
    });
});
