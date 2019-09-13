import {finalize, first, skip} from 'rxjs/operators';
import {windowResize} from './window-resize';

describe(windowResize.name, () => {
    it('should emit an initial value', done => {
        windowResize().pipe(
            first(),
            finalize(() => done())
        ).subscribe(value => expect(value).toBeTruthy());
    });

    it('should emit changes to the window size', done => {
        windowResize().pipe(
            skip(1),
            first(),
            finalize(() => done())
        ).subscribe(value => expect(value).toBeTruthy());

        window.dispatchEvent(new Event('resize'));
    });
});
