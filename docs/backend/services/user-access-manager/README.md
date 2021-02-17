# User Access Manager Service

> The service responsible for Authentication, Authorization, User Management and their information and Activity Log for each user.

# Table of Contents

- Module: [User Manager](#user-manager).
  - Feature: [Register a new User](#register-a-new-user).

# User Manager

> The module responsible for User Management.
> Create, Update, List and Deactivate a user.

<details><summary>User Object</summary>

- `id`: `String` - The user unique identification.
- `email`: `String` - The user identification email.
- `fullName`: `String` - The user account full name.

```json
{
  "id": "c5c5fb9f-3dd5-4b0e-9f01-b76c42f751f5",
  "email": "fulano@email.com",
  "fullName": "Fulano de Tal"
}
```

</details>

## Table of Features

- [Register a new User](#register-a-new-user)

## Register a new User

> Register a new User with Email and Password like identification data.

> `POST /v1/users`

### **Request**

```sh
curl -X POST .../v1/users \
-H "Content-Type: application/json" \
-d '{
	"fullName": "Fulano de Tal",
	"email": "fulano@email.com",
	"passoword": "pass123"
}'
```

<details><summary>Request Object</summary>

- `fullName`: `String` - The user account profile full name.
- `email`: `String` - The user identification email.
- `password`: `String` - The user identification password. Password confirmation can be on the frontend side only.

</details>

### **Response**

> Returns the User Object if a new user was created.
>
> Returns an [Error](https://github.com/sandb0/lebook/tree/main/docs/backend/API_REFERENCE.md#errors) if for any reason the new user could not be created. For example, service unavailable or one of the parameters is invalid.

```json
{
  "id": "c5c5fb9f-3dd5-4b0e-9f01-b76c42f751f5",
  "email": "fulano@email.com",
  "fullName": "Fulano de Tal"
}
```

### **Specifications**

<details><summary>Validation Rules</summary>

> - `Full Name` must have at least 2 words of at least 3 characters each.
> - `Email` must be unique and valid.
> - `Password` must be between 6 and 16 characters.
> - `Password` must be repeated/confirmed.

</details>
