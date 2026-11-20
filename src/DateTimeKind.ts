/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

/**
 * Const enum for DateTimeKind values providing compile-time optimization.
 * Used internally (inlined); consumers use the regular DateTimeKind enum.
 * @readonly
 * @enum {number}
 */
export const enum DateTimeKindValue
{
	Unspecified,
	Local,
	Utc,
}

/**
 * Specifies whether a DateTime is local, UTC, or unspecified.
 * A regular enum so it is usable as a runtime value in every consumer setup
 * (isolatedModules / verbatimModuleSyntax cannot read an ambient const enum).
 * @enum {number}
 */
enum DateTimeKind
{
	Unspecified = DateTimeKindValue.Unspecified,
	Local       = DateTimeKindValue.Local,
	Utc         = DateTimeKindValue.Utc,
}

/**
 * Union type that accepts DateTimeKindValue, DateTimeKind, or the raw numeric values.
 */
export type DateTimeKindOrValue = DateTimeKind | DateTimeKindValue | 0 | 1 | 2;

export default DateTimeKind;
