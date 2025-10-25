import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { LoanRequestDTO } from '../dto/loan-request-dto'

test.describe('Loan risk decision API tests', () => {
  test('Positive decision, Low risk, should return 200 OK', async ({ request }) => {
    const requestBody = LoanRequestDTO.createLowRiskRequest()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
        headers: { 'Content-Type': 'application/json' },
      },
    )

    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Low Risk')
    expect.soft(responseBody.riskPeriods).toEqual([12, 18, 24, 30, 36])
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBe('positive')

    console.log('response status:', response.status())
    console.log('response body:', await responseBody)
  })

  test('Positive decision, Medium risk, should return 200 OK', async ({ request }) => {
    const requestBody = LoanRequestDTO.createMediumRiskRequest()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
        headers: { 'Content-Type': 'application/json' },
      },
    )

    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
    expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBe('positive')

    console.log('response status:', response.status())
    console.log('response body:', responseBody)
  })

  test('Negative decision, High risk, should return 200 OK', async ({ request }) => {
    const requestBody = LoanRequestDTO.createHighRiskRequest()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Very High Risk')
    expect.soft(responseBody.riskPeriods).toEqual([])
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBe('negative')

    console.log('response status:', response.status())
    console.log('response body:', responseBody)
  })

  test('Invalid loan request should return 400 Bad Request', async ({ request }) => {
    const requestBody = LoanRequestDTO.createInvalidLoanRequest()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    const responseText = await response.text()

    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
    expect.soft(responseText).toBe('')

    console.log('response status:', response.status())
    console.log('response body:', await response.text())
  })
})

// Edge cases

test.describe('Edge cases', () => {
  test('Extremely large loan amount should return 200 OK', async ({ request }) => {
    const requestBody = LoanRequestDTO.createExtremelyLargeLoanRequest()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Very High Risk')
    expect.soft(responseBody.riskPeriods).toEqual([])
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBe('negative')

    console.log('response status:', response.status())
    console.log('response body:', responseBody)
  })

  test('Very short loan period should return 200 OK', async ({ request }) => {
    const requestBody = LoanRequestDTO.createVeryShortLoanPeriodRequest()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Unknown Risk')
    expect.soft(responseBody.riskPeriods).toEqual([])
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBe('positive')

    console.log('response status:', response.status())
    console.log('response body:', responseBody)
  })

  test('Very old applicant loan should return 200 OK', async ({ request }) => {
    const requestBody = LoanRequestDTO.createVeryOldApplicantRequest()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
    expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBe('positive')

    console.log('response status:', response.status())
    console.log('response body:', responseBody)
  })

  test('High income but unemployed loan should return 200 OK', async ({ request }) => {
    const requestBody = LoanRequestDTO.createHighIncomeUnemployedRequest()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
    expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBe('positive')

    console.log('response status:', response.status())
    console.log('response body:', responseBody)
  })
})
