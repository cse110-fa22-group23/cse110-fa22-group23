/* eslint-env jest */
/* global test, describe, it, expect, jest */
// scripts.test.js

test('init() returns 0', () => {
  const { init } = require('../assets/js/index')
  expect(init()).toBe(0)
})
