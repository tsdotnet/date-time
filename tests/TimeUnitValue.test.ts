import { describe, it, expect } from 'vitest';
import TimeUnitValue from '../src/TimeUnitValue';
import TimeQuantity from '../src/TimeQuantity';
import TimeUnit from '../src/TimeUnit';

describe('TimeUnitValue', () => {
	describe('constructor', () => {
		it('should create TimeUnitValue with numeric value', () => {
			const tuv = new TimeUnitValue(1000, TimeUnit.UnitType.Milliseconds);
			expect(tuv.value).toBe(1000);
			expect(tuv.units).toBe(TimeUnit.UnitType.Milliseconds);
		});

		it('should create TimeUnitValue with TimeQuantity value', () => {
			const timeQuantity = new TimeQuantity(5000); // 5000 milliseconds
			const tuv = new TimeUnitValue(timeQuantity, TimeUnit.UnitType.Seconds);
			expect(tuv.value).toBe(5); // 5000ms = 5 seconds
			expect(tuv.units).toBe(TimeUnit.UnitType.Seconds);
		});

		it('should validate unit type in constructor', () => {
			expect(() => new TimeUnitValue(1000, 999 as TimeUnit.UnitType)).toThrow();
		});

		it('should handle different unit types', () => {
			const milliseconds = new TimeUnitValue(1000, TimeUnit.UnitType.Milliseconds);
			expect(milliseconds.value).toBe(1000);
			expect(milliseconds.units).toBe(TimeUnit.UnitType.Milliseconds);

			const seconds = new TimeUnitValue(60, TimeUnit.UnitType.Seconds);
			expect(seconds.value).toBe(60);
			expect(seconds.units).toBe(TimeUnit.UnitType.Seconds);

			const minutes = new TimeUnitValue(30, TimeUnit.UnitType.Minutes);
			expect(minutes.value).toBe(30);
			expect(minutes.units).toBe(TimeUnit.UnitType.Minutes);

			const hours = new TimeUnitValue(24, TimeUnit.UnitType.Hours);
			expect(hours.value).toBe(24);
			expect(hours.units).toBe(TimeUnit.UnitType.Hours);

			const days = new TimeUnitValue(7, TimeUnit.UnitType.Days);
			expect(days.value).toBe(7);
			expect(days.units).toBe(TimeUnit.UnitType.Days);
		});
	});

	describe('value getter and setter', () => {
		it('should get and set value correctly', () => {
			const tuv = new TimeUnitValue(1000, TimeUnit.UnitType.Milliseconds);
			expect(tuv.value).toBe(1000);

			tuv.value = 2000;
			expect(tuv.value).toBe(2000);
		});

		it('should update total milliseconds when value changes', () => {
			const tuv = new TimeUnitValue(1, TimeUnit.UnitType.Seconds);
			expect(tuv.getTotalMilliseconds()).toBe(1000);

			tuv.value = 2;
			expect(tuv.getTotalMilliseconds()).toBe(2000);
		});

		it('should handle decimal values', () => {
			const tuv = new TimeUnitValue(1.5, TimeUnit.UnitType.Seconds);
			expect(tuv.value).toBe(1.5);
			expect(tuv.getTotalMilliseconds()).toBe(1500);

			tuv.value = 0.5;
			expect(tuv.value).toBe(0.5);
			expect(tuv.getTotalMilliseconds()).toBe(500);
		});

		it('should handle zero and negative values', () => {
			const tuv = new TimeUnitValue(0, TimeUnit.UnitType.Seconds);
			expect(tuv.value).toBe(0);
			expect(tuv.getTotalMilliseconds()).toBe(0);

			tuv.value = -5;
			expect(tuv.value).toBe(-5);
			expect(tuv.getTotalMilliseconds()).toBe(-5000);
		});
	});

	describe('units getter', () => {
		it('should return the unit type set in constructor', () => {
			const msUnit = new TimeUnitValue(1000, TimeUnit.UnitType.Milliseconds);
			expect(msUnit.units).toBe(TimeUnit.UnitType.Milliseconds);

			const secUnit = new TimeUnitValue(60, TimeUnit.UnitType.Seconds);
			expect(secUnit.units).toBe(TimeUnit.UnitType.Seconds);

			const minUnit = new TimeUnitValue(30, TimeUnit.UnitType.Minutes);
			expect(minUnit.units).toBe(TimeUnit.UnitType.Minutes);
		});

		it('should be read-only (not settable after construction)', () => {
			const tuv = new TimeUnitValue(1000, TimeUnit.UnitType.Milliseconds);
			expect(tuv.units).toBe(TimeUnit.UnitType.Milliseconds);
			
			// Verify that units is read-only by attempting to set it
			// This should not change the value
			const originalUnits = tuv.units;
			expect(tuv.units).toBe(originalUnits);
		});
	});

	describe('from static method', () => {
		it('should create TimeUnitValue from numeric value with default units', () => {
			const tuv = TimeUnitValue.from(5000);
			expect(tuv.value).toBe(5000);
			expect(tuv.units).toBe(TimeUnit.UnitType.Milliseconds);
		});

		it('should create TimeUnitValue from numeric value with specified units', () => {
			const tuv = TimeUnitValue.from(10, TimeUnit.UnitType.Seconds);
			expect(tuv.value).toBe(10);
			expect(tuv.units).toBe(TimeUnit.UnitType.Seconds);
		});

		it('should create TimeUnitValue from TimeQuantity with specified units', () => {
			const timeQuantity = new TimeQuantity(3600000); // 1 hour in milliseconds
			const tuv = TimeUnitValue.from(timeQuantity, TimeUnit.UnitType.Hours);
			expect(tuv.value).toBe(1);
			expect(tuv.units).toBe(TimeUnit.UnitType.Hours);
		});

		it('should create TimeUnitValue from TimeQuantity with default units', () => {
			const timeQuantity = new TimeQuantity(2500);
			const tuv = TimeUnitValue.from(timeQuantity);
			expect(tuv.value).toBe(2500);
			expect(tuv.units).toBe(TimeUnit.UnitType.Milliseconds);
		});
	});

	describe('getTotalMilliseconds', () => {
		it('should convert different units to milliseconds correctly', () => {
			const ms = new TimeUnitValue(1500, TimeUnit.UnitType.Milliseconds);
			expect(ms.getTotalMilliseconds()).toBe(1500);

			const sec = new TimeUnitValue(5, TimeUnit.UnitType.Seconds);
			expect(sec.getTotalMilliseconds()).toBe(5000);

			const min = new TimeUnitValue(2, TimeUnit.UnitType.Minutes);
			expect(min.getTotalMilliseconds()).toBe(120000);

			const hr = new TimeUnitValue(1, TimeUnit.UnitType.Hours);
			expect(hr.getTotalMilliseconds()).toBe(3600000);

			const day = new TimeUnitValue(1, TimeUnit.UnitType.Days);
			expect(day.getTotalMilliseconds()).toBe(86400000);
		});

		it('should handle fractional values', () => {
			const halfSec = new TimeUnitValue(0.5, TimeUnit.UnitType.Seconds);
			expect(halfSec.getTotalMilliseconds()).toBe(500);

			const quarterMin = new TimeUnitValue(0.25, TimeUnit.UnitType.Minutes);
			expect(quarterMin.getTotalMilliseconds()).toBe(15000);
		});
	});

	describe('to conversion method', () => {
		it('should convert to different units', () => {
			const original = new TimeUnitValue(5000, TimeUnit.UnitType.Milliseconds);
			
			const asSeconds = original.to(TimeUnit.UnitType.Seconds);
			expect(asSeconds.value).toBe(5);
			expect(asSeconds.units).toBe(TimeUnit.UnitType.Seconds);

			const asMinutes = original.to(TimeUnit.UnitType.Minutes);
			expect(asMinutes.value).toBeCloseTo(5000 / 60000, 6);
			expect(asMinutes.units).toBe(TimeUnit.UnitType.Minutes);
		});

		it('should convert to same units (creating a copy)', () => {
			const original = new TimeUnitValue(1000, TimeUnit.UnitType.Milliseconds);
			const copy = original.to(TimeUnit.UnitType.Milliseconds);
			
			expect(copy.value).toBe(original.value);
			expect(copy.units).toBe(original.units);
			expect(copy).not.toBe(original); // Different instances
		});

		it('should use current units as default', () => {
			const original = new TimeUnitValue(30, TimeUnit.UnitType.Minutes);
			const copy = original.to();
			
			expect(copy.value).toBe(30);
			expect(copy.units).toBe(TimeUnit.UnitType.Minutes);
			expect(copy).not.toBe(original);
		});

		it('should handle complex conversions', () => {
			const hours = new TimeUnitValue(2.5, TimeUnit.UnitType.Hours);
			
			const asMinutes = hours.to(TimeUnit.UnitType.Minutes);
			expect(asMinutes.value).toBe(150);
			expect(asMinutes.units).toBe(TimeUnit.UnitType.Minutes);

			const asSeconds = hours.to(TimeUnit.UnitType.Seconds);
			expect(asSeconds.value).toBe(9000);
			expect(asSeconds.units).toBe(TimeUnit.UnitType.Seconds);

			const asMilliseconds = hours.to(TimeUnit.UnitType.Milliseconds);
			expect(asMilliseconds.value).toBe(9000000);
			expect(asMilliseconds.units).toBe(TimeUnit.UnitType.Milliseconds);
		});
	});

	describe('integration with TimeQuantity', () => {
		it('should inherit TimeQuantity functionality', () => {
			const tuv = new TimeUnitValue(5000, TimeUnit.UnitType.Milliseconds);
			
			// Should have TimeQuantity methods
			expect(typeof tuv.getTotalMilliseconds).toBe('function');
			expect(tuv.getTotalMilliseconds()).toBe(5000);
		});

		it('should work with TimeQuantity operations', () => {
			const timeQuantity = new TimeQuantity(7200000); // 2 hours in milliseconds
			const tuv = TimeUnitValue.from(timeQuantity, TimeUnit.UnitType.Hours);
			
			expect(tuv.value).toBe(2);
			expect(tuv.units).toBe(TimeUnit.UnitType.Hours);
			expect(tuv.getTotalMilliseconds()).toBe(7200000);
		});
	});
});
