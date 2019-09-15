import {of} from 'rxjs';
import {finalize, mapTo} from 'rxjs/operators';
import {ifOp} from './if-op';

describe(ifOp.name, () => {
    it('should apply the operator when true', done => {
        of('Hello').pipe(
            ifOp(true, mapTo('Goodbye')),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual('Goodbye'));
    });

    it('should not apply the operator when false', done => {
        of('Hello').pipe(
            ifOp(false, mapTo('Goodbye')),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual('Hello'));
    });
});
