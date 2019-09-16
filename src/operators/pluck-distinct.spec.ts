import {of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {pluckDistinct} from './pluck-distinct';

describe(pluckDistinct.name, () => {
    it('should pluck a property value', async () => {
        const v = await of({name: 'John Smith'}).pipe(
            pluckDistinct('name'),
            toArray()
        ).toPromise();
        expect(v).toEqual(['John Smith']);
    });

    it('should pluck nested property', async () => {
        const v = await of({person: {name: 'John Smith'}}).pipe(
            pluckDistinct('person', 'name'),
            toArray()
        ).toPromise();
        expect(v).toEqual(['John Smith']);
    });

    it('should emit unique values', async () => {
        const v = await of(
            {name: 'John Smith'},
            {name: 'John Smith'},
            {name: 'John Smith'},
            {name: 'Jane Doe'},
            {name: 'Jane Doe'},
            {name: 'Mike Smith'},
            {name: 'Jason Doe'}
        ).pipe(
            pluckDistinct('name'),
            toArray()
        ).toPromise();
        expect(v).toEqual(['John Smith', 'Jane Doe', 'Mike Smith', 'Jason Doe']);
    });
});
