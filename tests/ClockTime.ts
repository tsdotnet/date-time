import random from '@tsdotnet/random';
import {assert} from 'chai';
import ClockTime from '../src/ClockTime';
import {milliseconds} from '../src/howMany';


const
	days        = random.integer(364) + 1,
	hour        = random.integer(24),
	minute      = random.integer(60),
	second      = random.integer(60),
	millisecond = random.integer(1000);

const c1 = new ClockTime(hour, minute, second, millisecond);
const c2 = new ClockTime(
	days*milliseconds.per.day
	+ hour*milliseconds.per.hour
	+ minute*milliseconds.per.minute
	+ second*milliseconds.per.second
	+ millisecond);

describe('.', () => {
	it('should match constructor values', () => {
		assert.equal(c1.hour, hour);
		assert.equal(c1.minute, minute);
		assert.equal(c1.second, second);
		assert.equal(c1.millisecond, millisecond);
	});

	it('should match summed values', () => {
		assert.equal(c2.day, days);
		assert.equal(c2.hour, hour);
		assert.equal(c2.minute, minute);
		assert.equal(c2.second, second);
		assert.equal(c2.millisecond, millisecond);
	});
});

describe('.equals', () => {
	it('should not be equal', () => {
		assert.ok(!c1.equals(c2));
	});

	it('c1 should be less than c2', () => {
		assert.ok(c1.compareTo(c2)<0);
	});
});
