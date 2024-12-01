# 2023

## Installation

### Rust

Install Rust if necessary

### TypeScript

Install Bun if necessary, then run `bun install` from the 2024 directory

## How to get the answers

### Rust

In the Rust directory for a given day, run `cargo run`

### TypeScript

The answers are already in the test files, but in order to reproduce them from
the solution files, you can add lines like `console.log(await partOne())` and
then run the file with `bun run 2024/01/typescript/solution.ts` from the root
directory or `bun run 01/typescript/solution.ts` from the 2024 directory

## How to run the tests

### Rust

In the Rust directory for a given day, run `cargo test`

### TypeScript

Run `bun test` in the 2024 directory, optionally passing a path to a specific
test file
