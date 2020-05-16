/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import CalendarDate from './CalendarDate';
import ClockTimeValue from './ClockTimeValue';

export interface TimeStampValue
	extends CalendarDate, Partial<ClockTimeValue>
{

}
