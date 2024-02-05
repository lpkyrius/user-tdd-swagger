# To-Do

##### predefined

- [x] Project structure
- [x] TDD
- [x] In-Memory repository
- [x] Unit tests
- [x] E2E tests - addressing the factory to in-memory repository.
- [x] Swagger API Docs.

##### This phase

- [ ] Implement user class (not integrated yet)
    - [ ] TDD
    - [x] User Entity
    - [x] User Interface
    - [x] Mocked Users
    - [x] ManagerUserTestFile
    - [x] User Repository In-Memory (Start with the methods signature only)
    - [x] Services - UserService
    - [ ] Controller - UserService
    - [ ] Router - UserService

##### Next phase

> ⭐️ Save the UUID keys in database as binary type

- [ ] Persist data with MySQL
    - Knex migrations;
    - Factory following the new persist repository;
    - Create the persistent repository only with the methods signature;
    - TDD is already done since I made it for in-memory repository;

##### Next phase

- [ ] Integrate Users authentication (JWT) for Tasks management;