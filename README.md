// API Testing Checklist

| Endpoint                | Scenario                                     | Expected result           | Test status |
| ----------------------- | -------------------------------------------- | ------------------------- | ----------- |
| PUT/test-orders/{id}    | Update order with valid ID and valid API key | 200 OK                    | ✅          |
| PUT/test-orders/{id}    | Update order with missing API key            | 401 Unauthorized          | ✅          |
| PUT/test-orders/{id}    | Update order with empty request body         | 400 Bad Request           | ✅          |
| DELETE/test-orders/{id} | Delete order with valid ID and valid API key | 204 No Content            | ✅          |
| DELETE/test-orders/{id} | Delete order with invalid API key            | 401 Unauthorized          | ✅          |
| DELETE/test-orders/{id} | Delete order with missing API key            | 401 Unauthorized          | ✅          |
| GET/test-orders         | Login with valid username and password       | 200 OK                    | ✅          |
| GET/test-orders         | Login with missing username and password     | 500 Internal Server Error | ✅          |
