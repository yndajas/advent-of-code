#!/usr/bin/env ruby

filename = ARGV.first
calories_by_elf = []
elf_index = 0

File.readlines(filename).each do |line|
  if line == "\n"
    elf_index += 1
    next
  end

  current_calories = calories_by_elf[elf_index] || 0
  calories_to_add = line.to_i

  calories_by_elf[elf_index] = current_calories + calories_to_add
end

puts calories_by_elf.max
# 69281

puts calories_by_elf.sort.reverse.first(3).reduce(:+)
# 201524
