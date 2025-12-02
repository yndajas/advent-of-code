# frozen_string_literal: true

require 'benchmark'

def get_input(file)
  File.readlines("2025/input/#{file}").map(&:chomp)
end

def test(description, actual:, expected: nil)
  result = case expected
  when nil
    '❓'
  when actual
    '✅'
  else
    '❌'
  end

  output = "#{description} #{result}"

  if expected.nil?
    output += "\ngot: #{actual.inspect}\n\n"
  elsif expected && actual != expected
    output += "\nexpected: #{expected.inspect}\ngot: #{actual.inspect}\n\n"
  end

  puts output
end

def benchmark(description: '', times: [1, 10, 100], &block)
  times.each do |count|
    puts "#{description} x #{count}".strip
    puts(Benchmark.measure { count.times { block.call } })
  end
end
