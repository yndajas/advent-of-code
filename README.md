# Advent of Code solutions

My solutions to [Advent of Code](https://adventofcode.com) puzzles

## Stats

### Stars by year

Before 2025, each year had 25 days; now each year has 12. Each day per year has
two parts, each awarding one star for the correct answer. You can't access part
two without completing part one. Before 2025 the maximum stars per year was 50;
now it's 24.

| Year           | Stars |
| -------------- | ----- |
| 2025 (ongoing) | 8     |
| 2024           | 40    |
| 2023           | 10    |
| 2022           | 2     |
| 2015           | 4     |

### Parts solved by language by year

Solving parts in multiple languages doesn't award extra stars, but it's a fun
way to learn/practice different languages.

| Language   | 2025 (ongoing) | 2024 | 2023 | 2022 | 2015 | Total  |
| ---------- | -------------- | ---- | ---- | ---- | ---- | ------ |
| TypeScript | 0              | 40   | 10   | 0    | 4    | **54** |
| C#         | 0              | 8    | 0    | 0    | 0    | **8**  |
| Ruby       | 8              | 0    | 0    | 2    | 0    | **10** |
| Go         | 0              | 4    | 0    | 0    | 0    | **4**  |
| Rust       | 0              | 4    | 0    | 0    | 0    | **4**  |

## Getting the prompt and input

These are available at
<https://adventofcode.com/THE_YEAR/day/THE_DAY_WITHOUT_ZERO_PADDING>. To get
them locally, paste your Advent of Code cookie into the `.env` file and run the
script `script/start.zsh` (or `script/download.zsh`) with the year and day.

## Linking to assets (inputs and prompts)

The solution files in this repo rely on an associated assets repo (mine is
stored privately on GitHub). The assets repo should have top-level folders for
each year and an `input` and `prompt` folder within each year folder. Within the
prompt and input folders, there should be a file per day, with the name
containing the day zero-padded and for prompts suffixed with `.html`.

The path to the assets repo should be set in the `.env` file. With this set up,
running `script/download.zsh` or `script/start.zsh` should sort the rest out.
