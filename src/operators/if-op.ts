import {Observable, OperatorFunction} from 'rxjs';

/**
 * Apply an operator based on a condition. This operator only adds another operator when the
 * condition is true. When the condition is false the source observable is not modified.
 */
export function ifOp<T, R>(cond: boolean, operator: OperatorFunction<T, R>): OperatorFunction<T, T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return cond ? source.pipe(operator) : source;
    };
}
