# Users Info

I built a simple React Native app that lists users from a mock API. Firstly, I used a traditional layered module structure, but over time I realized it was hard to maintain and test, so I decided to refactor and improve it. It was not well-organized, had low code coverage, was difficult to maintain, and tests were missing for most parts.

I refactored the project to use a feature-based, clean architecture. Now, each feature has its own folder, and the code is separated by responsibility. This made it easier for me to write unit tests for every screen, component, utility, and hook in the app.

While refactoring, I fixed all SonarQube issues and also resolved vulnerabilities found by GitHub Dependabot. After these changes, SonarQube reported zero issues.

I also added accessibility support for people with visual impairments, using React Native’s accessibility props. This means the app can be much easier used by people with disabilities.

The project is now more maintainable and testable. The code is cleaner, there are no security warnings, and it is more accessible.

## Commands

- `yarn start` starts Metro bundler
- `yarn android` runs the app on Android
- `yarn ios` runs the app on iOS
- `yarn lint` checks code style
- `yarn test` runs all tests
- `yarn test:cov` shows test coverage
- `yarn install` installs packages

## Libraries

- react, react-native
- typescript
- @react-navigation
- @tanstack/react-query
- axios
- @react-native-async-storage/async-storage
- react-native-vector-icons
- react-native-safe-area-context
- react-native-screens
- react-native-dotenv
- jest, @testing-library/react-native (testing)
- eslint, prettier (code style)

## Code Style

- Run `yarn lint` to check code
- Run Prettier in your editor or use `prettier` if set up
- All code uses TypeScript

## Structure

- `src/constants` has colors, strings, test ids
- `src/features` has app features *each feature has components, screens, utils, hooks*
- `src/navigation` has navigation setup
- `src/types` has TypeScript types
- `src/test-utils` has test helpers

## Tests

- Run `yarn test` to check tests
- Run `yarn test:cov` for coverage
- All code is tested
- Coverage is 100 percent

## SonarQube/SonarCloud

- No vulnerabilities
- No code smells or bugs
- If you use Sonar, run your usual scan

## How to Start

1. Run `yarn install`
2. Run `yarn start`
3. Run `yarn android` or `yarn ios`
4. Run `yarn test` to check tests
5. Run `yarn test:cov` for coverage
6. Run `yarn lint` to check code style
