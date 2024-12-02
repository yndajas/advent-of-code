use std::fmt::Debug;
use std::fs::read_to_string;
use std::str::FromStr;

// https://doc.rust-lang.org/rust-by-example/std_misc/file/read_lines.html
pub fn read_lines(filename: &str) -> Vec<String> {
    read_to_string(filename)
        .unwrap() // panic on possible file-reading errors
        .lines() // split the string into an iterator of string slices
        .map(String::from) // make each slice into a string
        .collect() // gather them together into a vector
}

pub fn numbers_from_delimited_string<T>(string: &String, delimiter: &str) -> Vec<T>
where
    T: FromStr,
    <T as FromStr>::Err: Debug,
{
    string
        .split(delimiter)
        .map(|number_string| number_string.parse::<T>().unwrap())
        .collect()
}
