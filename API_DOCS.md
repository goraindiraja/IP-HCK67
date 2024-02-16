# My Assets App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

## Models :

__User__
- name: string (required)
- email: string, unique (required)
- password: string (required)
- imageUrl: string

## Endpoints: 

List of available endpoints:
- `POST /login`
- `POST /register`
- `POST /login/Google`

Routes below need authentication:
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `PATCH /users/:id/img`

## REST API Endpoints
### 1. POST /login

> Get access token

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": string,
    "password": string
}
```

_Response (200)_
```json
{
  "access_token": "<your_access_token>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email / Password required"
}
```

_Response (401 - Unauthenticated)_
```json
{
  "message": "Invalid Email / Password"
}
```
---
### 2. POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": string 
    "email": string
    "password": string
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted_name>",
  "email": "<posted_email>",
  "imageUrl": "<posted_imageUrl>",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email has already been registered"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid Email format"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthenticated)_
```json
{
  "message": "Unauthenticated"
}
```

---
### 3. GET /users

> Get all current stored jobs data

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@test.com",
        "imageUrl": "https://randomuser.me/api/portraits/men/34.jpg"
    },
    ...
]
```

_Response (401 - Unauthenticated)_
```json
{
  "message": "Unauthenticated"
}
```
---
### 4. GET /users/:id

> Get a single job data based on id

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
}
```
_Request Params_
```
{
    id: integer
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@test.com",
    "imageUrl": "https://randomuser.me/api/portraits/men/34.jpg"
}
```

_Response (401 - Unauthenticated)_
```json
{
  "message": "Unauthenticated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
---
### 6. PUT /users/:id

> Update job data for the current logged in user id (Staff cannot update another user's jobs portal)

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Params_
```
{
    id: <integer>
}
```

_Request Body_
```
{
  "name": <string>,
  "email": <string>
}
```

_Response (200)_
```json
{
    "message":`Data ${id} has been updated`
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid Email format"
}
```

_Response (401 - Unauthenticated)_
```json
{
  "message": "Unauthenticated"
}
```
---
### 7. PATCH /jobs/:id
> Update imgUrl of the current logged in user id (cannot update another user's jobs portal)

_Request Header_
```
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Params_
```
{
    id: <integer>
}
```
_Request File_
```
{
    buffer: <image file buffer>
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
    message: `Image User ${id} has been updated`
}
```

_Response (401 - Unauthenticated)_
```json
{
  "message": "Unauthenticated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
---
### Global Error
_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```