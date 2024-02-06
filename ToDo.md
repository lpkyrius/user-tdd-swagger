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
    - [x] User Entity
    - [x] User Interface
    - [x] Mocked Users
    - [x] TDD ManagerUserTestFile
    - [x] TDD User Repository In-Memory (Start with the methods signature only)
    - [x] TDD Services - UserService
    - [x] Setting up switch mode for e2e tests using .env
    - [ ] TDD Controller - UserService
    - [ ] TDD Router - UserService
    - [ ] Swagger update - add User process

##### Next phase

> ⭐️ Save the UUID keys in database as binary type

- [ ] Persist data with MySQL
    - Knex migrations;
    - Factory following the new persist repository;
    - Create the persistent repository only with the methods signature;
    - TDD is already done since I made it for in-memory repository;

##### Next phase

- [ ] Integrate Users authentication (JWT) for Tasks management;