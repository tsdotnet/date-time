/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import * as howMany from "../src/howMany";
import * as howManyConstEnums from "../src/howManyConstEnums";

describe('howMany', () => {
	
	describe('hours.per', () => {
		it('should have correct values', () => {
			expect(howMany.hours.per.day).toBe(24);
		});
	});

	describe('minutes.per', () => {
		it('should have correct values', () => {
			expect(howMany.minutes.per.hour).toBe(60);
			expect(howMany.minutes.per.day).toBe(60 * 24);
		});
	});

	describe('seconds.per', () => {
		it('should have correct values', () => {
			expect(howMany.seconds.per.minute).toBe(60);
			expect(howMany.seconds.per.hour).toBe(60 * 60);
			expect(howMany.seconds.per.day).toBe(60 * 60 * 24);
		});
	});

	describe('milliseconds.per', () => {
		it('should have correct values', () => {
			expect(howMany.milliseconds.per.second).toBe(1000);
			expect(howMany.milliseconds.per.minute).toBe(1000 * 60);
			expect(howMany.milliseconds.per.hour).toBe(1000 * 60 * 60);
			expect(howMany.milliseconds.per.day).toBe(1000 * 60 * 60 * 24);
		});
	});

	describe('ticks.per', () => {
		it('should have correct values', () => {
			expect(howMany.ticks.per.millisecond).toBe(10000);
			expect(howMany.ticks.per.second).toBe(10000 * 1000);
			expect(howMany.ticks.per.minute).toBe(10000 * 1000 * 60);
			expect(howMany.ticks.per.hour).toBe(10000 * 1000 * 60 * 60);
			expect(howMany.ticks.per.day).toBe(10000 * 1000 * 60 * 60 * 24);
		});
	});

	describe('Runtime Object Properties', () => {
		it('should have frozen objects for runtime access', () => {
			// Verify objects are frozen (immutable)
			expect(Object.isFrozen(howMany.hours.per)).toBe(true);
			expect(Object.isFrozen(howMany.minutes.per)).toBe(true);
			expect(Object.isFrozen(howMany.seconds.per)).toBe(true);
			expect(Object.isFrozen(howMany.milliseconds.per)).toBe(true);
			expect(Object.isFrozen(howMany.ticks.per)).toBe(true);
		});

		it('should not allow modification of runtime objects', () => {
			// Attempt to modify should fail silently or throw in strict mode
			const originalValue = howMany.milliseconds.per.second;
			
			// This should throw an error due to Object.freeze in strict mode
			expect(() => {
				(howMany.milliseconds.per as any).second = 999;
			}).toThrow('Cannot assign to read only property');
			
			// Value should remain unchanged
			expect(howMany.milliseconds.per.second).toBe(originalValue);
			expect(howMany.milliseconds.per.second).toBe(1000);
		});

		it('should support object iteration and enumeration', () => {
			// Runtime objects should be enumerable
			const msKeys = Object.keys(howMany.milliseconds.per);
			expect(msKeys).toContain('second');
			expect(msKeys).toContain('minute');
			expect(msKeys).toContain('hour');
			expect(msKeys).toContain('day');

			// Should be able to iterate over values
			const msValues = Object.values(howMany.milliseconds.per);
			expect(msValues).toContain(1000); // second
			expect(msValues).toContain(60000); // minute
			expect(msValues).toContain(3600000); // hour
			expect(msValues).toContain(86400000); // day
		});
	});

	describe('Const Enum Compile-Time Optimization', () => {
		it('should allow direct const enum access for compile-time inlining', () => {
			// These should be inlined at compile time but still work at runtime
			expect(howManyConstEnums.milliseconds.per.second).toBe(1000);
			expect(howManyConstEnums.milliseconds.per.minute).toBe(60000);
			expect(howManyConstEnums.hours.per.day).toBe(24);
			expect(howManyConstEnums.ticks.per.millisecond).toBe(10000);
		});

		it('should have consistent values between const enums and runtime objects', () => {
			// Verify that const enum values match runtime object values
			expect(howMany.milliseconds.per.second).toBe(howManyConstEnums.milliseconds.per.second);
			expect(howMany.milliseconds.per.minute).toBe(howManyConstEnums.milliseconds.per.minute);
			expect(howMany.milliseconds.per.hour).toBe(howManyConstEnums.milliseconds.per.hour);
			expect(howMany.milliseconds.per.day).toBe(howManyConstEnums.milliseconds.per.day);
			
			expect(howMany.hours.per.day).toBe(howManyConstEnums.hours.per.day);
			expect(howMany.minutes.per.hour).toBe(howManyConstEnums.minutes.per.hour);
			expect(howMany.seconds.per.minute).toBe(howManyConstEnums.seconds.per.minute);
			expect(howMany.ticks.per.millisecond).toBe(howManyConstEnums.ticks.per.millisecond);
		});
	});

	describe('Cross-Package Usage Simulation', () => {
		it('should work with dynamic property access', () => {
			// Simulate how other packages might access these values dynamically
			const timeUnit = 'milliseconds';
			const period = 'second';
			
			// This kind of dynamic access should work with runtime objects
			const value = (howMany as any)[timeUnit].per[period];
			expect(value).toBe(1000);
		});

		it('should support destructuring assignment', () => {
			// Should be able to destructure from runtime objects
			const { second, minute, hour, day } = howMany.milliseconds.per;
			
			expect(second).toBe(1000);
			expect(minute).toBe(60000);
			expect(hour).toBe(3600000);
			expect(day).toBe(86400000);
		});

		it('should work in calculations and function parameters', () => {
			// Simulate typical usage patterns
			function convertToMilliseconds(value: number, unit: 'second' | 'minute' | 'hour' | 'day'): number {
				return value * howMany.milliseconds.per[unit];
			}
			
			expect(convertToMilliseconds(5, 'second')).toBe(5000);
			expect(convertToMilliseconds(2, 'minute')).toBe(120000);
			expect(convertToMilliseconds(1, 'hour')).toBe(3600000);
		});

		it('should maintain type safety', () => {
			// TypeScript should provide proper type checking
			// These assignments should be type-safe
			const msPerSec: number = howMany.milliseconds.per.second;
			const hoursPerDay: number = howMany.hours.per.day;
			
			expect(typeof msPerSec).toBe('number');
			expect(typeof hoursPerDay).toBe('number');
			
			// Values should be what we expect
			expect(msPerSec).toBe(1000);
			expect(hoursPerDay).toBe(24);
		});
	});
});
