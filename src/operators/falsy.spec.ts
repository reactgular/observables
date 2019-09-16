import {of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {falsy} from './falsy';

describe(falsy.name, () => {
    it('should emit only falsy values', async () => {
        const v = await of(1, 0, false, true, {}, '').pipe(
            falsy(),
            toArray()
        ).toPromise();
        expect(v).toEqual([0, false, '']);
    });
});
