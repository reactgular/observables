import {of} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {ifOp} from './if-op';

describe(ifOp.name, () => {
    it('should apply the operator when true', async () => {
        const v = await of('Hello').pipe(
            ifOp(true, mapTo('Goodbye'))
        ).toPromise();
        expect(v).toEqual('Goodbye');
    });

    it('should not apply the operator when false', async () => {
        const v = await of('Hello').pipe(
            ifOp(false, mapTo('Goodbye'))
        ).toPromise();
        expect(v).toEqual('Hello');
    });
});
