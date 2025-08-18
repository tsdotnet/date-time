import { describe, it, expect } from 'vitest';
import DateTime from '../src/DateTime.js';

describe('DateTime daysInMonth and isLeapYear', () => {
	const startYear = 2000;
	const daysPerMonth = [
		31, //January,
		28,//February,
		31,//March,
		30,//April,
		31,//May,
		30,//June,
		31,//July,
		31,//August,
		30,//September,
		31,//October,
		30,//November,
		31//December
	];

	it('should match actual Gregorian values', () => {
		for(let y = startYear; y<2004; y++)
		{
			for(let m = 0; m<12; m++)
			{
				if(m===1 && DateTime.isLeapYear(y))
				{
					expect(DateTime.daysInMonth(y, m)).toBe(29);
				}
				else
				{
					expect(DateTime.daysInMonth(y, m)).toBe(daysPerMonth[m]);
				}
			}
		}
	});

	it('should correctly identify leap years', () => {
		expect(DateTime.isLeapYear(2000)).toBe(true);
		expect(DateTime.isLeapYear(2001)).toBe(false);
		expect(DateTime.isLeapYear(2004)).toBe(true);
		expect(DateTime.isLeapYear(1900)).toBe(false); // Century year not divisible by 400
		expect(DateTime.isLeapYear(2000)).toBe(true); // Century year divisible by 400
	});
});

describe('DateTime between', () => {
	it('should return a positive delta for proper dates', () => {
		const result = DateTime.between(new Date('2016-06-06'), new Date('2016-07-06'));
		expect(result.total.milliseconds).toBeGreaterThan(0);
	});

	it('should return negative delta for reversed dates', () => {
		const result = DateTime.between(new Date('2016-07-06'), new Date('2016-06-06'));
		expect(result.total.milliseconds).toBeLessThan(0);
	});
});

describe('DateTime equals and comparison', () => {
	const d1 = '2016-06-06', d2 = '2016-06-07';
	
	it('should match equal dates', () => {
		const x = new DateTime(d1), y = new DateTime(d1);
		expect(x.equals(y)).toBe(true);
	});

	it('should not match different dates', () => {
		const x = new DateTime(d1), y = new DateTime(d2);
		expect(x.equals(null as any)).toBe(false);
		expect(x.equals(y)).toBe(false);
	});

	it('should compare correctly', () => {
		const x = new DateTime(d1), y = new DateTime(d2), z = new DateTime(d2);
		expect(x.compareTo(y)).toBeLessThan(0);
		expect(y.compareTo(x)).toBeGreaterThan(0);
		expect(y.compareTo(z)).toBe(0);
	});
});
