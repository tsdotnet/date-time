/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
export declare const enum DateTimeKindValue {
    Unspecified = 0,
    Local = 1,
    Utc = 2
}
declare enum DateTimeKind {
    Unspecified = 0,
    Local = 1,
    Utc = 2
}
export type DateTimeKindOrValue = DateTimeKind | DateTimeKindValue | 0 | 1 | 2;
export default DateTimeKind;
