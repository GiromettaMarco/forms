import { expect, test } from 'vite-plus/test'
import {
  hasMixedCase,
  hasNumber,
  hasSymbol,
  isEmail,
  isFloat,
  isHexColor,
  isInteger
} from '@/regex'

test('hasMixedCase regex', () => {
  expect(hasMixedCase.test('a_a')).toBe(false)
  expect(hasMixedCase.test('A_A')).toBe(false)
  expect(hasMixedCase.test('A_a')).toBe(true)
  expect(hasMixedCase.test('a_A')).toBe(true)
})

test('hasNumber regex', () => {
  expect(hasNumber.test('abc')).toBe(false)
  expect(hasNumber.test('a1c')).toBe(true)
})

test('hasSymbol regex', () => {
  expect(hasSymbol.test('abc')).toBe(false)
  expect(hasSymbol.test('a!c')).toBe(true)
})

test('isEmail regex', () => {
  expect(isEmail.test('a@b.c')).toBe(false)
  expect(isEmail.test('a@b.cd')).toBe(true)
  expect(isEmail.test('a.b@b.cd')).toBe(true)
  expect(isEmail.test('ab.c')).toBe(false)
  expect(isEmail.test('a@bc')).toBe(false)
})

test('isFloat regex', () => {
  expect(isFloat.test('a')).toBe(false)
  expect(isFloat.test('5')).toBe(true)
  expect(isFloat.test('5.')).toBe(true)
  expect(isFloat.test('5.5')).toBe(true)
  expect(isFloat.test('5.a')).toBe(false)
})

test('isHexColor regex', () => {
  expect(isHexColor.test('fff')).toBe(false)
  expect(isHexColor.test('#fff')).toBe(true)
  expect(isHexColor.test('#ffffff')).toBe(true)
  expect(isHexColor.test('#ffz')).toBe(false)
  expect(isHexColor.test('#ff')).toBe(false)
})

test('isInteger regex', () => {
  expect(isInteger.test('a')).toBe(false)
  expect(isInteger.test('5')).toBe(true)
  expect(isInteger.test('5.')).toBe(false)
  expect(isInteger.test('5.5')).toBe(false)
  expect(isInteger.test('5a')).toBe(false)
})
