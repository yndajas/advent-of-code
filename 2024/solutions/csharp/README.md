# 2024 C#/.NET

## Installation

1. Install C#/.NET if necessary (e.g. dotnet-sdk via Homebrew)
2. Run `dotnet tool install` or `dotnet tool restore` in repo root \[STEP NEEDS
   VERIFYING - this is to install CSharpier\]

## Creating an app/script for a new day

1. In the day's directory within `2024/solutions/csharp`, run
   `dotnet new console`
2. From the repository root, run
   `dotnet sln add 2024/solutions/csharp/DAY_FOLDER`, replacing `DAY_FOLDER`
   with the day, e.g. `02` for the second day. This registers this project with
   the .NET 'solution`, which will enable language server features

## Getting the answers

In the day's directory within `2024/solutions/csharp`, run `dotnet run`

## Running the tests

Tests are not currently implemented
