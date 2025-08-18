/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import { ResettableLazy } from '@tsdotnet/lazy';
import type TimeMeasurement from './TimeMeasurement';
import TimeUnit from './TimeUnit';
export default class TimeQuantity {
    protected _quantity: number;
    constructor(_quantity?: number);
    static getTotalMillisecondsFrom(values: Partial<TimeMeasurement>): number;
    get direction(): number;
    protected _total: ResettableLazy<Readonly<TimeMeasurement>>;
    get total(): Readonly<TimeMeasurement>;
    getTotalMilliseconds(): number;
    equals(other: TimeQuantity): boolean;
    compareTo(other: TimeQuantity): number;
    getTotal(units: TimeUnit.UnitType): number;
}
