import { describe, it, expect } from 'vitest';
import ClockTime from '../src/ClockTime.js';
import { milliseconds } from '../src/howManyConstEnums.js';

// Use fixed values instead of random for predictable tests
const
	days        = 10,
	hour        = 14,
	minute      = 30,
	second      = 45,
	millisecond = 500;

const c1 = new ClockTime(hour, minute, second, millisecond);
const c2 = new ClockTime(
	days*milliseconds.per.day
	+ hour*milliseconds.per.hour
	+ minute*milliseconds.per.minute
	+ second*milliseconds.per.second
	+ millisecond);

describe('ClockTime Constructor', () => {
	it('should match constructor values', () => {
		expect(c1.hour).toBe(hour);
		expect(c1.minute).toBe(minute);
		expect(c1.second).toBe(second);
		expect(c1.millisecond).toBe(millisecond);
	});

	it('should match summed values', () => {
		expect(c2.day).toBe(days);
		expect(c2.hour).toBe(hour);
		expect(c2.minute).toBe(minute);
		expect(c2.second).toBe(second);
		expect(c2.millisecond).toBe(millisecond);
	});
});

describe('ClockTime Comparison', () => {
	it('should not be equal', () => {
		expect(c1.equals(c2)).toBe(false);
	});

	it('c1 should be less than c2', () => {
		expect(c1.compareTo(c2)).toBeLessThan(0);
	});

	it('should create ClockTime with just milliseconds', () => {
		const totalMs = 3661500; // 1 hour, 1 minute, 1 second, 500ms
		const clock = new ClockTime(totalMs);
		expect(clock.hour).toBe(1);
		expect(clock.minute).toBe(1);
		expect(clock.second).toBe(1);
		expect(clock.millisecond).toBe(500);
	});

	it('should handle zero values', () => {
		const clock = new ClockTime(0, 0, 0, 0);
		expect(clock.hour).toBe(0);
		expect(clock.minute).toBe(0);
		expect(clock.second).toBe(0);
		expect(clock.millisecond).toBe(0);
		expect(clock.day).toBe(0);
	});

	it('should handle equality comparison', () => {
		const clock1 = new ClockTime(12, 30, 45, 100);
		const clock2 = new ClockTime(12, 30, 45, 100);
		expect(clock1.equals(clock2)).toBe(true);
		expect(clock1.compareTo(clock2)).toBe(0);
	});
});
