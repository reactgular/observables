import {of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {negate} from './negate';

describe(negate.name, () => {
    it('should invert boolean values', async () => {
        const v = await of(true, false, false, true).pipe(
            negate(),
            toArray()
        ).toPromise();
        expect(v).toEqual([false, true, true, false]);
    });

    it('should emit false for truthy values', async () => {
        const v = await of(true, {}, 'hello', 1, []).pipe(
            negate(),
            toArray()
        ).toPromise();
        expect(v).toEqual([false, false, false, false, false]);
    });

    it('should emit true for falsy values', async () => {
        const v = await of<any>(false, 0, '', NaN, null, undefined).pipe(
            negate(),
            toArray()
        ).toPromise();
        expect(v).toEqual([true, true, true, true, true, true]);
    });
});
