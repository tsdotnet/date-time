/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

import {expect} from "chai";
import * as howMany from "../src/howMany";

describe('howMany', () => {
	
	describe('hours.per', () => {
		it('should have correct values', () => {
			expect(howMany.hours.per.day).to.equal(24);
		});
	});

	describe('minutes.per', () => {
		it('should have correct values', () => {
			expect(howMany.minutes.per.hour).to.equal(60);
			expect(howMany.minutes.per.day).to.equal(60 * 24);
		});
	});

	describe('seconds.per', () => {
		it('should have correct values', () => {
			expect(howMany.seconds.per.minute).to.equal(60);
			expect(howMany.seconds.per.hour).to.equal(60 * 60);
			expect(howMany.seconds.per.day).to.equal(60 * 60 * 24);
		});
	});

	describe('milliseconds.per', () => {
		it('should have correct values', () => {
			expect(howMany.milliseconds.per.second).to.equal(1000);
			expect(howMany.milliseconds.per.minute).to.equal(1000 * 60);
			expect(howMany.milliseconds.per.hour).to.equal(1000 * 60 * 60);
			expect(howMany.milliseconds.per.day).to.equal(1000 * 60 * 60 * 24);
		});
	});

	describe('ticks.per', () => {
		it('should have correct values', () => {
			expect(howMany.ticks.per.millisecond).to.equal(10000);
			expect(howMany.ticks.per.second).to.equal(10000 * 1000);
			expect(howMany.ticks.per.minute).to.equal(10000 * 1000 * 60);
			expect(howMany.ticks.per.hour).to.equal(10000 * 1000 * 60 * 60);
			expect(howMany.ticks.per.day).to.equal(10000 * 1000 * 60 * 60 * 24);
		});
	});

	describe('JavaScript runtime usage', () => {
		it('should work when imported from compiled JavaScript', async () => {
			// This test ensures that the howMany module can be imported and used
			// from JavaScript after compilation, which was the original issue
			const howManyModule = await import('../dist/cjs/howMany.js');
			
			// Test that the module exports are accessible
			expect(howManyModule.hours).to.be.an('object');
			expect(howManyModule.minutes).to.be.an('object');
			expect(howManyModule.seconds).to.be.an('object');
			expect(howManyModule.milliseconds).to.be.an('object');
			expect(howManyModule.ticks).to.be.an('object');

			// Test that values are correctly inlined/available
			// Note: const enums are inlined, so the actual values should be accessible
			expect(howManyModule.hours.per.day).to.equal(24);
			expect(howManyModule.minutes.per.hour).to.equal(60);
			expect(howManyModule.seconds.per.minute).to.equal(60);
			expect(howManyModule.milliseconds.per.second).to.equal(1000);
			expect(howManyModule.ticks.per.millisecond).to.equal(10000);
		});
	});
});
