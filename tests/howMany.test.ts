/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import * as howMany from "../src/howMany";

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
});
