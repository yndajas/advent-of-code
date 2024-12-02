use std::fs::read_to_string;

fn main() {
    let lines = read_lines("../../../input/01");
    println!("{}", part_one(lines));
}

fn part_one(lines: Vec<String>) -> i32 {
    let mut left_side_location_ids: Vec<i32> = vec![];
    let mut right_side_location_ids: Vec<i32> = vec![];

    lines.iter().for_each(|line| {
        let location_ids: Vec<i32> = line
            .split("   ")
            .map(|location_id| location_id.parse::<i32>().unwrap())
            .collect();
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

// https://doc.rust-lang.org/rust-by-example/std_misc/file/read_lines.html
fn read_lines(filename: &str) -> Vec<String> {
    read_to_string(filename)
        .unwrap() // panic on possible file-reading errors
        .lines() // split the string into an iterator of string slices
        .map(String::from) // make each slice into a string
        .collect() // gather them together into a vector
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let lines = read_lines("../../../input/01");
        assert_eq!(part_one(lines), 1189304);
    }
}
