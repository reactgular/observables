import {marbles} from 'rxjs-marbles';
import {first, skip} from 'rxjs/operators';
import {windowResize} from './window-resize';

describe('windowResize', () => {
    it('should emit an initial value', async () => {
        const value = await windowResize().pipe(first()).toPromise();
        expect(value).toBeTruthy();
    });

    it('should emit changes to the window size', async () => {
        setTimeout(() => window.dispatchEvent(new Event('resize')));
        const value = await windowResize().pipe(skip(1), first()).toPromise();
        expect(value).toBeTruthy();
    });
});
