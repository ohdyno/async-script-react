# 2. Use Next.js for front-end development

Date: 2023-04-17

## Status

Accepted

## Context

From the inception, this project is going to be a full-stack software, with the primary
user interfacing being a simple web application. Therefore, Xing needs to decide what kind of
initial structure makes sense to support developing the web application.

## Decision

**Use Next.js as the React framework for developing the web application.**

Initially, we wanted to use CRA (Create-React-App) since it was the tool recommended by React's
official website when we first started developing in React. However, in reading the [updated React documentation](https://react.dev/learn/start-a-new-react-project),
the React team has removed CRA as a recommended tool for creating a new React application.

As a result, we skimmed through React team's recommended framework and decided Nextjs
as the most appropriate framework because of two key features:
- the Nextjs documentation mentions testing specifically, and it links to testing tools (e.g. Cypress) that has explicit Nextjs support
- Nextjs's starter template is relatively lightweight and therefore seems to support an incremental apporach in learning/using Nextjs.

Other frameworks were considered:
- CRA - outdated and not recommended from React documentation
- Remix - no explicit mentions of testing in its documentation, which we inferred as additional, unnecessary effort

## Consequences

Nextjs is an opinionated framework that we are not well-versed in. Therefore, we may uncover decisions that we do not agree
with further development. In order to handle the potential need of replacing Nextjs with another framework, the web application
components will be designed and tested with as little Nextjs-specific dependency as possible.
