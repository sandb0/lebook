# Backend

> Learn more about the entire backend of this application.

## Table of Contents

- [Services Structure](#services-structure).
- [API Reference](#api-reference).
- [Services Documentation](#services-documentation).
  - Service: [User Access Manager Service](https://github.com/sandb0/lebook/tree/main/docs/backend/services/user-access-manager).

## Services Structure

> This application is based on microservices (not so "micro" :grin:). And the project structure for each of these services follows the pattern below.

- `src/`.

  - `index.ts`.

  - `configs/`.

  - `frameworks/`.

    - `http/`.
    - `database/`.

  - `abstractions/`.

    - `domain/`.
    - `application/`.
    - `infrastructure/`.
      - `controllers/`.

  - `modules/`.
    - `[ModuleName]/`.
      - `domain/`.
      - `application/`.
      - `infrastructure/`.
        - `controllers/`.
          - `[ControllerName]/`.
            - `__tests__/`.

## API Reference

> Check this [document](https://github.com/sandb0/lebook/tree/main/docs/backend/API_REFERENCE.md) to see the API Reference for this application.

## Services Documentation

- [User Access Manager Service](https://github.com/sandb0/lebook/tree/main/docs/backend/services/user-access-manager). Responsible for Authentication, Authorization, User Management and their information and Activity Log for each user.
