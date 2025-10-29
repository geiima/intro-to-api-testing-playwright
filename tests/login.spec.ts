import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../dto/login-dto'

test.describe('Positive scenarios', () => {
  test('should return token with correct username and password', async ({ request }) => {
    const requestBody = LoginDto.createLoginDto()
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.OK)
    const jwtValue = await response.text()
    const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
    expect(jwtValue).toMatch(jwtRegex)
    //console.log('response body and token', await response.text())
  })

  test('should return non-empty token ', async ({ request }) => {
    const requestBody = LoginDto.createLoginDto()
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.OK)
    const jwtValue = await response.text()
    expect(jwtValue).not.toBe('')
    //console.log('response body and token', await response.text())
  })
})

test.describe('Negative scenarios', () => {
  test('should not return token with incorrect username and password', async ({ request }) => {
    const requestBody = new LoginDto('eimantebbb', '')
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    //console.log('response body and token', await response.text())
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not return token with incorrect HTTP method', async ({ request }) => {
    const requestBody = LoginDto.createLoginDto()
    const response = await request.get('https://backend.tallinn-learning.ee/login/student', {
      data: requestBody,
    })
    //console.log('response body and token', await response.text())
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('should not return token with incorrect body structure', async ({ request }) => {
    const invalidBody = { user: 'wrong', pass: 'wrong' }
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: invalidBody,
    })
    //console.log('response body and token', await response.text())
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})
