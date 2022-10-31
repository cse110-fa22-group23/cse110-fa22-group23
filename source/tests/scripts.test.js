/* eslint-env jest */
/* global test, expect */
// scripts.test.js

test('init() returns 0', () => {
  const { init } = require('../assets/js/index')
  expect(init()).toBe(0)
})
