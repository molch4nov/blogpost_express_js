Blog API Documentation
This documentation provides details on the endpoints available in the Blog API.

Authentication
Endpoint: /auth

POST /auth/register: Register a new user account.
POST /auth/login: Log in with an existing user account and receive a JWT token.
Blog Posts
Endpoint: /api/blog

GET /api/blog: Retrieve a list of blog posts with pagination support.
POST /api/blog: Create a new blog post (requires authentication).
PUT /api/blog/{postId}: Update an existing blog post (requires authentication and ownership).
DELETE /api/blog/{postId}: Delete an existing blog post (requires authentication and ownership).
Request Headers
For authenticated requests, include the following header:

makefile
Copy code
Authorization: Bearer <JWT_TOKEN>
Replace <JWT_TOKEN> with the valid JWT token obtained after successful authentication.

Response Format
The API responses are returned in JSON format.

Example response for a successful request:

json
Copy code
{
  "data": {
    "id": 1,
    "message": "Example blog post",
    "author_id": 1,
    "created_at": "2023-05-28T12:34:56.789Z"
  }
}
Example response for an error:

json
Copy code
{
  "error": "Unauthorized"
}
Examples
Create a Blog Post
Request:

Method: POST
URL: /api/blog
Headers:
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
Body:
json
Copy code
{
  "message": "Example blog post"
}
Response:

Status: 200 OK
Body:
json
Copy code
{
  "data": {
    "id": 1,
    "message": "Example blog post",
    "author_id": 1,
    "created_at": "2023-05-28T12:34:56.789Z"
  }
}
Update a Blog Post
Request:

Method: PUT
URL: /api/blog/{postId}
Headers:
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
Body:
json
Copy code
{
  "message": "Updated blog post"
}
Response:

Status: 200 OK
Body:
json
Copy code
{
  "message": "Blog post updated successfully"
}
Delete a Blog Post
Request:

Method: DELETE
URL: /api/blog/{postId}
Headers:
Authorization: Bearer <JWT_TOKEN>
Response:

Status: 200 OK
Body:
json
Copy code
{
  "message": "Blog post deleted successfully"
}
