import {of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {truthy} from './truthy';

describe(truthy.name, () => {
    it('should emit only true values', async () => {
        const v = await of(1, 0, false, true, {}, '').pipe(
            truthy(),
            toArray()
        ).toPromise();
        expect(v).toEqual([1, true, {}]);
    });
});
