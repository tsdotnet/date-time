/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */

import CalendarDate from './CalendarDate';
import ClockTimeValue from './ClockTimeValue';

export interface TimeStampValue
	extends CalendarDate, Partial<ClockTimeValue>
{

}
