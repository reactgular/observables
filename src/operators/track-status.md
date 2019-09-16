Emits an Object with the properties *status* and *value*. The status property
will contain either `"start"`, `"value"` or `"error"`.

When the *status* property is:

- `"start"` the *value* is the first parameter or *undefined*. This is always the *first* emitted value.
- `"value"` the *value* property is the outer observable value.
- `"error"` the *value* is the caught error.

```typescript
trackStatus<T, S>(start?: S): OperatorFunction<T, TrackStatus<T | S>>
```

Example:

```typescript
of("Hello World").pipe(
    trackStatus()
).subscribe(v => console.log(v));
// prints 
// {state: "start", value: undefined}
// {state: "value", value: "Hello World"}
```

Using this operator makes it easy to create loading indicators
for Angular components.

Example:

```typescript
import {trackStatus, TrackStatus} from '@reactgular/observable/operators';

@Component({
    selector: 'example',
    template: `
        <ng-container *ngIf="track$ | async as track" [ngSwitch]="track.status">
            <div *ngSwitchCase='"start"'>
                Please wait while loading...
            </div>
            <div *ngSwitchCase='"value"'>
                {{track.value}}
            </div>
            <div *ngSwitchCase='"error"'>
                There was an error loading data...
            </div>
        </ng-container>`
})
export class ExampleComponent implements OnInit {
    public track$: Observable<TrackStatus<any>>;
   
    public constructor(private http: HttpClient) { }
   
    public ngOnInit() {
        this.data$ = this.http
            .get('https://example.com/api')
            .pipe(trackStatus());    
    }
}
```
