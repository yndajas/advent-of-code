use utils::{numbers_from_delimited_string, read_lines};

fn main() {
    let lines = read_lines("../../../input/02");
    println!("{}", part_one_solution_one(&lines));
    println!("{}", part_one_solution_two(&lines));
}

fn part_one_solution_one(lines: &Vec<String>) -> i16 {
    let mut safe_reports: i16 = 0;

    for (_, report) in lines.iter().enumerate() {
        let numbers: Vec<i8> = numbers_from_delimited_string(report, " ");
        let mut last_number: i8 = numbers[0];
        let mut incrementing = false;
        let mut decrementing = false;
        let mut safe = true;

        for (current_number_index, current_number) in numbers.iter().enumerate() {
            if current_number_index == 0 {
                continue;
            }

            if current_number_index == 1 {
                match current_number - last_number {
                    1..=3 => {
                        incrementing = true;
                        last_number = *current_number;
                        continue;
                    }
                    -3..=-1 => {
                        decrementing = true;
                        last_number = *current_number;
                        continue;
                    }
                    _ => {
                        safe = false;
                        break;
                    }
                }
            }

            if incrementing {
                match current_number - last_number {
                    1..=3 => {
                        last_number = *current_number;
                    }
                    _ => {
                        safe = false;
                        break;
                    }
                }
            }

            if decrementing {
                match last_number - current_number {
                    1..=3 => {
                        last_number = *current_number;
                    }
                    _ => {
                        safe = false;
                        break;
                    }
                }
            }
        }

        if safe {
            safe_reports += 1;
        }
    }

    safe_reports
}

fn part_one_solution_two(lines: &Vec<String>) -> i16 {
    let mut safe_reports: i16 = 0;

    for (_, report) in lines.iter().enumerate() {
        let numbers: Vec<i8> = numbers_from_delimited_string(report, " ");

        match unsafe_jump_index(&numbers) {
            Some(_) => continue,
            None => safe_reports += 1,
        }
    }

    return safe_reports;
}

fn unsafe_jump_index(numbers: &Vec<i8>) -> Option<usize> {
    let increasing = numbers[0] < numbers[1];

    for (current_number_index, current_number) in numbers.iter().enumerate() {
        if current_number_index == 0 {
            continue;
        }

        let last_number = numbers[current_number_index - 1];
        let progress: i8;

        if increasing {
            progress = current_number - last_number;
        } else {
            progress = last_number - current_number;
        }

        match progress {
            1..=3 => continue,
            _ => return Some(current_number_index),
        }
    }

    return None;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one_solution_one() {
        let lines = read_lines("../../../input/02");
        assert_eq!(part_one_solution_one(&lines), 220);
    }

    #[test]
    fn test_part_one_solution_two() {
        let lines = read_lines("../../../input/02");
        assert_eq!(part_one_solution_two(&lines), 220);
    }
}
