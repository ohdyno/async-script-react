# Focused UI Component with React `useReducer`
A simple proof of concept code on using React's `useReducer` to create focused UI component.

This started simply with a goal of reducing the UI component's responsibilities down to:
1. render the UI based on data
2. dispatch actions based on user input

Using React's `useReducer` hook is a straight forward way on creating a structured design to support
this goal. The real challenge was figuring out how to test these UI components. While I could have followed
testing-library's suggestion to test them in an "integrated" way, I wasn't satisfied because I believe
that there is a natural boundary created when you adopt the event-sourcing pattern recommended by Redux and
`useReducer`. This natural boundary is begging to be tested. This proof of concept is an
exploration into testing this boundary.