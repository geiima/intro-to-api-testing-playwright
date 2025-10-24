import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from '../dto/order-dto'

// GET endpoint
test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})

test('get order with correct ID 5 should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/5')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})

test('get order with wrong ID should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 400
  expect(response.status()).toBe(400)
})

// POST endpoint
test('post order with correct data should receive code 200', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

// Example of BAD_REQUEST
test('post order with incorrect data should receive code 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OP',
    courierId: '0',
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// Homework assignment
// PUT endpoint

test('update order with valid ID and valid API key should receive 200 OK', async ({ request }) => {
  const requestBody = OrderDto.createOrderWithRandomData()
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('update order with missing API key should receive 401 Unauthorized', async ({ request }) => {
  const requestBody = new OrderDto('Peter', '123456789', 'comment', 1)
  const requestHeaders = {
    api_key: '',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

// Additionally added  test

test('update order with invalid API key should receive 401 Unauthorized', async ({ request }) => {
  const requestBody = OrderDto.createOrderWithLowPriority()
  const requestHeaders = {
    api_key: '123',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('update order with empty request body should receive 400 Bad Request', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// DELETE endpoint
test('delete order with valid ID and valid API key should receive 204 No Content', async ({
  request,
}) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  // Send a DELETE request to the server
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('delete order with invalid API key should receive 401 Unauthorized', async ({ request }) => {
  const requestHeaders = {
    api_key: '111',
  }
  // Send a DELETE request to the server
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('delete order with missing API key should receive 401 Unauthorized', async ({ request }) => {
  const requestHeaders = {
    api_key: '',
  }
  // Send a DELETE request to the server
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

// GET endpoint
test('login with valid username and password should receive 200 OK', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: {
      username: 'Peter',
      password: 'password123',
    },
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('login with missing username and password should receive 500 Internal Server Error', async ({
  request,
}) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {})
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
