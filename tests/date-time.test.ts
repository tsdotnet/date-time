import { describe, it, expect } from 'vitest';
import {
	Gregorian,
	ClockTime,
	DateTime,
	DateTimeKind,
	howMany,
	TimeQuantity,
	TimeSpan,
	TimeStamp,
	TimeUnit,
	TimeUnitValue
} from '../src/date-time';

describe('date-time module exports', () => {
	describe('named exports', () => {
		it('should export Gregorian calendar utilities', () => {
			expect(Gregorian).toBeDefined();
			expect(Gregorian.Month).toBeDefined();
			expect(Gregorian.DayOfWeek).toBeDefined();
			expect(Gregorian.Month.January).toBe(1);
			expect(Gregorian.DayOfWeek.Sunday).toBe(0);
		});

		it('should export ClockTime class', () => {
			expect(ClockTime).toBeDefined();
			expect(typeof ClockTime).toBe('function');
			
			// Test instantiation
			const clockTime = new ClockTime(12, 30, 45);
			expect(clockTime).toBeInstanceOf(ClockTime);
		});

		it('should export DateTime class', () => {
			expect(DateTime).toBeDefined();
			expect(typeof DateTime).toBe('function');
			
			// Test instantiation with default parameters
			const dateTime = new DateTime();
			expect(dateTime).toBeInstanceOf(DateTime);
		});

		it('should export DateTimeKind enum', () => {
			// Test individual enum values since the enum itself can't be tested directly
			expect(DateTimeKind.Unspecified).toBeDefined();
			expect(DateTimeKind.Local).toBeDefined();
			expect(DateTimeKind.Utc).toBeDefined();
		});

		it('should export howMany utilities', () => {
			expect(howMany).toBeDefined();
			expect(typeof howMany.seconds.per.minute).toBe('number');
			expect(typeof howMany.milliseconds.per.second).toBe('number');
		});

		it('should export TimeQuantity class', () => {
			expect(TimeQuantity).toBeDefined();
			expect(typeof TimeQuantity).toBe('function');
			
			// Test instantiation
			const timeQuantity = new TimeQuantity(1000);
			expect(timeQuantity).toBeInstanceOf(TimeQuantity);
		});

		it('should export TimeSpan class', () => {
			expect(TimeSpan).toBeDefined();
			expect(typeof TimeSpan).toBe('function');
			
			// Test static method since constructor is protected
			const timeSpan = TimeSpan.fromMilliseconds(1000);
			expect(timeSpan).toBeInstanceOf(TimeSpan);
		});

		it('should export TimeStamp class', () => {
			expect(TimeStamp).toBeDefined();
			expect(typeof TimeStamp).toBe('function');
			
			// Test instantiation with required parameters
			const timeStamp = new TimeStamp(2024, 1, 1);
			expect(timeStamp).toBeInstanceOf(TimeStamp);
		});

		it('should export TimeUnit utilities', () => {
			expect(TimeUnit).toBeDefined();
			expect(TimeUnit.UnitType).toBeDefined();
			expect(TimeUnit.UnitType.Milliseconds).toBeDefined();
		});

		it('should export TimeUnitValue class', () => {
			expect(TimeUnitValue).toBeDefined();
			expect(typeof TimeUnitValue).toBe('function');
			
			// Test instantiation
			const timeUnitValue = new TimeUnitValue(1000, TimeUnit.UnitType.Milliseconds);
			expect(timeUnitValue).toBeInstanceOf(TimeUnitValue);
		});
	});

	describe('type exports', () => {
		it('should verify type exports exist through usage', () => {
			// Types can't be directly tested at runtime, but we can verify the import works
			// by using them in type assertions
			expect(Gregorian).toBeDefined();
			expect(ClockTime).toBeDefined();
			expect(DateTime).toBeDefined();
		});
	});

	describe('module structure', () => {
		it('should have all expected named exports', () => {
			expect(Gregorian).toBeDefined();
			expect(ClockTime).toBeDefined();
			expect(DateTime).toBeDefined();
			// Test individual enum values since the enum itself can't be tested directly
			expect(DateTimeKind.Unspecified).toBeDefined();
			expect(howMany).toBeDefined();
			expect(TimeQuantity).toBeDefined();
			expect(TimeSpan).toBeDefined();
			expect(TimeStamp).toBeDefined();
			expect(TimeUnit).toBeDefined();
			expect(TimeUnitValue).toBeDefined();
		});

		it('should support destructuring imports', () => {
			// Already using destructuring in the import statement, so this verifies it works
			expect(Gregorian).toBeDefined();
			expect(ClockTime).toBeDefined();
			expect(DateTime).toBeDefined();
			expect(DateTimeKind.Unspecified).toBeDefined();
			expect(howMany).toBeDefined();
			expect(TimeQuantity).toBeDefined();
			expect(TimeSpan).toBeDefined();
			expect(TimeStamp).toBeDefined();
			expect(TimeUnit).toBeDefined();
			expect(TimeUnitValue).toBeDefined();
		});
	});

	describe('integration testing', () => {
		it('should allow creating and using exported classes together', () => {
			// Test that exported classes work together
			const dateTime = new DateTime();
			const timeSpan = TimeSpan.fromMilliseconds(1000);
			const clockTime = new ClockTime(12, 0, 0);
			const timeStamp = new TimeStamp(2024, 1, 1);
			const timeQuantity = new TimeQuantity(1000);
			const timeUnitValue = new TimeUnitValue(1000, TimeUnit.UnitType.Milliseconds);

			expect(dateTime).toBeInstanceOf(DateTime);
			expect(timeSpan).toBeInstanceOf(TimeSpan);
			expect(clockTime).toBeInstanceOf(ClockTime);
			expect(timeStamp).toBeInstanceOf(TimeStamp);
			expect(timeQuantity).toBeInstanceOf(TimeQuantity);
			expect(timeUnitValue).toBeInstanceOf(TimeUnitValue);
		});

		it('should provide consistent API surface', () => {
			// All class exports should be constructable or have static factory methods
			const classExports = [
				{ name: 'ClockTime', constructor: ClockTime },
				{ name: 'DateTime', constructor: DateTime },
				{ name: 'TimeQuantity', constructor: TimeQuantity },
				{ name: 'TimeSpan', constructor: TimeSpan },
				{ name: 'TimeStamp', constructor: TimeStamp },
				{ name: 'TimeUnitValue', constructor: TimeUnitValue }
			];
			
			classExports.forEach(({ name, constructor }) => {
				expect(typeof constructor).toBe('function');
				expect(constructor.prototype).toBeDefined();
			});
		});

		it('should allow enum usage', () => {
			// Test that enums are accessible and usable
			expect(typeof DateTimeKind.Unspecified).toBe('number');
			expect(typeof Gregorian.Month.January).toBe('number');
			expect(typeof Gregorian.DayOfWeek.Sunday).toBe('number');
			expect(typeof TimeUnit.UnitType.Milliseconds).toBe('number');
		});

		it('should provide utility functions', () => {
			// Test that utility functions are accessible
			expect(typeof howMany.seconds.per.minute).toBe('number');
			expect(howMany.seconds.per.minute).toBeGreaterThan(0);
		});
	});
});
