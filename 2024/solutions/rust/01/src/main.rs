use std::collections::HashMap;
use utils::{numbers_from_delimited_string, read_lines};

fn main() {
    let lines = read_lines("../../../input/01");
    println!("{}", part_one(&lines));
    println!("{}", part_two(&lines));
}

fn part_one(lines: &Vec<String>) -> i32 {
    let mut left_side_location_ids: Vec<i32> = vec![];
    let mut right_side_location_ids: Vec<i32> = vec![];

    lines.iter().for_each(|line| {
        let location_ids: Vec<i32> = numbers_from_delimited_string::<i32>(line, "   ");
        left_side_location_ids.push(location_ids[0]);
        right_side_location_ids.push(location_ids[1]);
    });

    left_side_location_ids.sort();
    right_side_location_ids.sort();

    let mut diffs: Vec<i32> = vec![];

    for (index, left_side_location_id) in left_side_location_ids.iter().enumerate() {
        let right_side_location_id = right_side_location_ids[index];
        diffs.push((left_side_location_id - right_side_location_id).abs())
    }

    diffs
        .iter()
        .copied()
        .reduce(|accumulator, current_number| accumulator + current_number)
        .unwrap()
}

fn part_two(lines: &Vec<String>) -> i32 {
    let mut left_side_location_ids: HashMap<i32, bool> = HashMap::new();
    let mut right_side_location_ids: Vec<i32> = vec![];

    lines.iter().for_each(|line| {
        let location_ids: Vec<i32> = numbers_from_delimited_string::<i32>(line, "   ");
        left_side_location_ids.insert(location_ids[0], true);
        right_side_location_ids.push(location_ids[1]);
    });

    let mut similarity_score: i32 = 0;

    right_side_location_ids
        .iter()
        .for_each(|right_side_location_id| {
            match left_side_location_ids.get(right_side_location_id) {
                Some(present) => {
                    if *present {
                        similarity_score += right_side_location_id
                    }
                }
                None => (),
            }
        });

    similarity_score
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let lines = read_lines("../../../input/01");
        assert_eq!(part_one(&lines), 1189304);
    }

    #[test]
    fn test_part_two() {
        let lines = read_lines("../../../input/01");
        assert_eq!(part_two(&lines), 24349736);
    }
}
