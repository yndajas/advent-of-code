# frozen_string_literal: true

require 'benchmark'
require 'dotenv'

Dotenv.load

def get_input(file, raw: true)
  assets_repo = ENV.fetch('ASSETS_REPO') { abort('ASSETS_REPO not set') }
  path = "#{assets_repo}/2025/input/#{file}"

  if raw
    File.read(path)
  else
    File.readlines(path).map(&:chomp)
  end
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

  output = "#{result} #{description}"

  if expected.nil?
    output += " - got #{actual.inspect}"
  elsif expected && actual != expected
    output += " - expected #{expected.inspect}, got #{actual.inspect}"
  end

  puts output
end

def test_multiple(test_args)
  puts "\n#{Time.now.strftime('%F %T')}"

  test_args.each { |desciption, named| test(desciption, **named) }
end

def benchmark(description: '', times: [1, 10, 100], &block)
  times.each do |count|
    puts "#{description} x #{count}".strip
    puts(Benchmark.measure { count.times { block.call } })
  end
end
