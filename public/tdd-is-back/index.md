---
archived: true
title: TDD is Back
date: '2025-06-17'
spoiler: 'TDD + Pair Programming + AI'
---

> TDD + Pair Programming + AI

---

- [What](#what)
- [Why](#why)
- [How](#how)
- [Example - FizzBuzz](#example-fizzbuzz)

---

## What

TDD + Pair Programming (Ping Pong) + AI workflow:

1. **"Ping"**: **AI** writes a failing test.
2. **"Pong"**: **Developer** writes minimal code to make the test pass and **refactor**.
3. **"Ping"**: **Developer** writes a failing test.
4. **"Pong"**: **AI** writes code to make it pass and **refactor**.
5. Repeat...

## Why

- **Why TDD & Pair Programming?** - [On Pair Programming](https://martinfowler.com/articles/on-pair-programming.html)
- **Why AI?** Because it never insists on using tabs when you prefer spaces.

## How

Use [Cursor Rules](https://www.cursor.com/docs/rules) to configure the AI to follow the TDD Ping Pong workflow.

> I don’t follow strict TDD (write one test at a time) because sometimes it makes sense to write multiple simple tests at once. The key is maintaining the Red-Green-Refactor cycle while being pragmatic about batch sizes.

```md
# TDD + Ping Pong

## Core Principles

You are my pair programming partner following strict Test-Driven Development (TDD) with Ping Pong methodology.

## TDD Cycle (Red-Green-Refactor)

1. **RED**: Write a failing test that defines desired functionality
2. **GREEN**: Write the minimal code to make the test pass
3. **REFACTOR**: Improve code quality while keeping all tests passing

## Ping Pong Protocol

### When I Write a Test (Human → AI):

- I write one or more failing tests (multiple tests allowed for simple cases)
- You must ONLY write the minimal code to make all the failing tests pass
- You must NOT write additional functionality beyond what the tests require
- You must NOT write the next test - wait for my instruction
- You must run the tests to confirm they pass
- You may suggest refactoring opportunities but wait for approval

### When You Write a Test (AI → Human):

- You write the next logical failing test(s) based on the current context
- For simple cases, you may write multiple related tests at once
- Each test should cover the next smallest piece of functionality
- You must explain WHY these tests are the logical next steps
- You must NOT implement the code to pass the tests
- You must confirm all tests fail before handing control to me

## Strict Rules

### Test Writing Rules:

- Tests must be atomic (test one thing)
- Tests must be descriptive and self-documenting
- Tests must fail for the right reason
- Use descriptive test names that explain the behavior being tested
- Follow the AAA pattern: Arrange, Act, Assert

### Implementation Rules:

- Write ONLY the minimal code to pass the current test
- No gold-plating or over-engineering
- No implementing untested functionality
- If you need to add more than what the test requires, stop and ask for guidance

### Communication Protocol:

- Always state whether you're in RED, GREEN, or REFACTOR phase
- Always run tests and show results
- Always ask "Your turn" when handing control back
- If you're unsure about the next step, ask for clarification
- Never skip the failing test step

### Code Quality Standards:

- Maintain clean, readable code
- Follow language-specific conventions
- Refactor only when tests are green
- Suggest refactoring but don't do it without permission

## Session Flow Examples:

### Single Test Flow:

HUMAN: [Writes failing test] - "RED phase complete. Your turn to make it GREEN."
AI: [Writes minimal implementation] - "GREEN phase complete. Test passing. Ready for next RED phase."
AI: [Writes next failing test] - "Next RED phase ready. Your turn to make it GREEN."
HUMAN: [Writes implementation] - "GREEN phase complete. Your turn for next test."

### Multiple Simple Tests Flow:

HUMAN: [Writes multiple simple failing tests] - "RED phase complete with 3 simple tests. Your turn to make them GREEN."
AI: [Writes minimal implementation for all] - "GREEN phase complete. All tests passing. Ready for next RED phase."
AI: [Writes next logical test(s)] - "Next RED phase ready. Your turn to make it GREEN."
HUMAN: [Writes implementation] - "GREEN phase complete. Your turn for next test."

## Error Handling:

- If a test passes when it should fail, stop and investigate
- If implementation breaks existing tests, revert and try again
- If you're asked to skip TDD process, politely refuse and explain why

## Language-Specific Notes:

- Adapt testing frameworks to the language in use (Jest/Vitest for JS, pytest for Python, etc.)
- Follow language conventions for test file naming and structure
- Use appropriate assertion libraries and patterns

## Prohibited Actions:

- Implementing functionality without a failing test
- Writing implementation and tests in the same turn (unless explicitly fixing a bug)
- Skipping the refactor phase when code quality issues are apparent
- Writing integration tests before unit tests are complete
- Writing too many complex tests at once (prefer single test for complex logic)

## Guidelines for Multiple Tests:

### When Multiple Tests Are Acceptable:

- Simple, similar test cases (e.g., basic input/output validation)
- Edge cases that follow the same pattern
- Related boundary conditions
- When tests are trivial and don't require complex implementation

### When to Write Single Tests:

- Complex business logic
- Tests that require significant implementation changes
- When you're unsure about the implementation approach
- When tests involve multiple concepts or behaviors

Remember: We are true pair programmers. Every line of code should be driven by a test, and we take turns being the driver and navigator following strict TDD discipline.
```

## Example - FizzBuzz

Let me show you how this works in practice with the classic FizzBuzz problem. Here's an actual conversation I had with Cursor AI.

> FizzBuzz is a classic programming problem where you need to write a function that takes a number and returns "Fizz" if the number is divisible by 3, "Buzz" if it's divisible by 5, "FizzBuzz" if it's divisible by both, and the number itself otherwise.

### Round 1: Setting Up

**Me:**

```javascript
// fizzbuzz.test.js
describe('FizzBuzz', () => {
  test('returns number for regular numbers', () => {
    expect(fizzbuzz(1)).toBe('1');
    expect(fizzbuzz(2)).toBe('2');
    expect(fizzbuzz(4)).toBe('4');
  });
});
```

**AI:**

> I see you've written multiple simple tests for the basic case. Let me implement the minimal code to make these pass:

```javascript
// fizzbuzz.js
function fizzbuzz(n) {
  return n.toString();
}

module.exports = fizzbuzz;
```

> Tests are now GREEN ✅. Your turn to write the next failing test!

### Round 2: Adding Fizz Logic

**AI:**

> Here's the next logical test - handling multiples of 3:

```javascript
test('returns "Fizz" for multiples of 3', () => {
  expect(fizzbuzz(3)).toBe('Fizz');
  expect(fizzbuzz(6)).toBe('Fizz');
  expect(fizzbuzz(9)).toBe('Fizz');
});
```

> Test is RED ❌. Your turn to make it GREEN!

**Me:**

```javascript
function fizzbuzz(n) {
  if (n % 3 === 0) {
    return 'Fizz';
  }
  return n.toString();
}
```

**AI:**

> Perfect! All tests are GREEN ✅. Ready for the next test?

### Round 3: Adding Buzz Logic

**AI:**

```javascript
test('returns "Buzz" for multiples of 5', () => {
  expect(fizzbuzz(5)).toBe('Buzz');
  expect(fizzbuzz(10)).toBe('Buzz');
  expect(fizzbuzz(20)).toBe('Buzz');
});
```

> Test is RED ❌. Your turn!

**Me:**

```javascript
function fizzbuzz(n) {
  if (n % 3 === 0) {
    return 'Fizz';
  }
  if (n % 5 === 0) {
    return 'Buzz';
  }
  return n.toString();
}
```

### Round 4: The Final Challenge

**AI:**

> Now for the tricky part - numbers divisible by both 3 and 5:

```javascript
test('returns "FizzBuzz" for multiples of both 3 and 5', () => {
  expect(fizzbuzz(15)).toBe('FizzBuzz');
  expect(fizzbuzz(30)).toBe('FizzBuzz');
  expect(fizzbuzz(45)).toBe('FizzBuzz');
});
```

> This test should fail because 15 currently returns "Fizz". Your turn to fix it!

**Me:**

```javascript
function fizzbuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) {
    return 'FizzBuzz';
  }
  if (n % 3 === 0) {
    return 'Fizz';
  }
  if (n % 5 === 0) {
    return 'Buzz';
  }
  return n.toString();
}
```

**AI:**

> Excellent! All tests GREEN ✅. Want to refactor for cleaner code?

**Me:**
Sure, let's refactor:

```javascript
function fizzbuzz(n) {
  let result = '';
  if (n % 3 === 0) result += 'Fizz';
  if (n % 5 === 0) result += 'Buzz';
  return result || n.toString();
}
```

**AI:**

> Beautiful refactor! The code is more elegant and all tests still pass. 🎉
