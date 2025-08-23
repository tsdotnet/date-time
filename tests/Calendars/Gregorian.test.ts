import { describe, it, expect } from 'vitest';
import { Month, DayOfWeek } from '../../src/Calendars/Gregorian';

describe('Gregorian Calendar', () => {
	describe('Month enum', () => {
		it('should have correct month values starting from 1', () => {
			expect(Month.January).toBe(1);
			expect(Month.February).toBe(2);
			expect(Month.March).toBe(3);
			expect(Month.April).toBe(4);
			expect(Month.May).toBe(5);
			expect(Month.June).toBe(6);
			expect(Month.July).toBe(7);
			expect(Month.August).toBe(8);
			expect(Month.September).toBe(9);
			expect(Month.October).toBe(10);
			expect(Month.November).toBe(11);
			expect(Month.December).toBe(12);
		});

		it('should have all 12 months defined', () => {
			const monthValues = Object.values(Month).filter(v => typeof v === 'number') as number[];
			expect(monthValues).toHaveLength(12);
			expect(Math.min(...monthValues)).toBe(1);
			expect(Math.max(...monthValues)).toBe(12);
		});

		it('should support month name lookup', () => {
			expect(Month[1]).toBe('January');
			expect(Month[6]).toBe('June');
			expect(Month[12]).toBe('December');
		});

		it('should support string to enum conversion', () => {
			expect(Month['January']).toBe(1);
			expect(Month['June']).toBe(6);
			expect(Month['December']).toBe(12);
		});

		it('should be compatible with date calculations', () => {
			// Test that Gregorian months align with common date operations
			const allMonths = [
				Month.January, Month.February, Month.March, Month.April,
				Month.May, Month.June, Month.July, Month.August,
				Month.September, Month.October, Month.November, Month.December
			];
			
			expect(allMonths).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		});

		it('should handle month arithmetic correctly', () => {
			// Common month operations should work predictably
			expect(Month.January + 1).toBe(Month.February);
			expect(Month.December - 1).toBe(Month.November);
			expect(Month.June * 2).toBe(Month.December);
		});
	});

	describe('DayOfWeek enum', () => {
		it('should have correct day values starting from 0', () => {
			expect(DayOfWeek.Sunday).toBe(0);
			expect(DayOfWeek.Monday).toBe(1);
			expect(DayOfWeek.Tuesday).toBe(2);
			expect(DayOfWeek.Wednesday).toBe(3);
			expect(DayOfWeek.Thursday).toBe(4);
			expect(DayOfWeek.Friday).toBe(5);
			expect(DayOfWeek.Saturday).toBe(6);
		});

		it('should have all 7 days of the week', () => {
			const dayValues = Object.values(DayOfWeek).filter(v => typeof v === 'number') as number[];
			expect(dayValues).toHaveLength(7);
			expect(Math.min(...dayValues)).toBe(0);
			expect(Math.max(...dayValues)).toBe(6);
		});

		it('should support day name lookup', () => {
			expect(DayOfWeek[0]).toBe('Sunday');
			expect(DayOfWeek[1]).toBe('Monday');
			expect(DayOfWeek[6]).toBe('Saturday');
		});

		it('should support string to enum conversion', () => {
			expect(DayOfWeek['Sunday']).toBe(0);
			expect(DayOfWeek['Monday']).toBe(1);
			expect(DayOfWeek['Saturday']).toBe(6);
		});

		it('should be compatible with JavaScript Date getDay()', () => {
			// JavaScript Date.getDay() returns 0 for Sunday, 1 for Monday, etc.
			// This enum should align with that convention
			const jsDate = new Date(2024, 0, 7); // A Sunday in January 2024
			const jsDayOfWeek = jsDate.getDay();
			expect(jsDayOfWeek).toBe(DayOfWeek.Sunday);
		});

		it('should handle day arithmetic with modulo for week cycling', () => {
			// Common day calculations
			expect((DayOfWeek.Sunday + 1) % 7).toBe(DayOfWeek.Monday);
			expect((DayOfWeek.Saturday + 1) % 7).toBe(DayOfWeek.Sunday);
			expect((DayOfWeek.Wednesday + 4) % 7).toBe(DayOfWeek.Sunday);
		});

		it('should support weekend/weekday classification', () => {
			const weekendDays = [DayOfWeek.Saturday, DayOfWeek.Sunday];
			const weekdayDays = [
				DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday,
				DayOfWeek.Thursday, DayOfWeek.Friday
			];

			// Weekend days
			expect(weekendDays).toContain(DayOfWeek.Saturday);
			expect(weekendDays).toContain(DayOfWeek.Sunday);
			
			// Weekday days
			weekdayDays.forEach(day => {
				expect(weekendDays).not.toContain(day);
			});
		});
	});

	describe('enum interactions', () => {
		it('should work together for calendar calculations', () => {
			// Test that both enums can be used in typical calendar scenarios
			const someMonth = Month.March;
			const someDay = DayOfWeek.Friday;
			
			expect(typeof someMonth).toBe('number');
			expect(typeof someDay).toBe('number');
			expect(someMonth).toBeGreaterThan(0);
			expect(someMonth).toBeLessThanOrEqual(12);
			expect(someDay).toBeGreaterThanOrEqual(0);
			expect(someDay).toBeLessThan(7);
		});

		it('should maintain type safety', () => {
			// These should be different types even though both are numbers
			const month: Month = Month.January;
			const day: DayOfWeek = DayOfWeek.Monday;
			
			expect(month).toBe(1);
			expect(day).toBe(1);
			// Even though they have the same value, they represent different concepts
		});
	});
});
