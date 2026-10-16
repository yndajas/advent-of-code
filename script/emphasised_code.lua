-- Advent of Code wraps answers and other significant values in emphasised code
-- (<em><code>42</code></em>), which shows as literal asterisks in the terminal.
-- Unwrapping leaves code spans adjacent, which pandoc separates with an empty
-- pair of backticks, so merge them instead.
function Inlines(inlines)
  local result = pandoc.Inlines({})

  for _, inline in ipairs(inlines) do
    local candidate = inline

    if inline.t == 'Emph'
      and #inline.content == 1
      and inline.content[1].t == 'Code' then
      candidate = inline.content[1]
    end

    local previous = result[#result]

    if candidate.t == 'Code' and previous and previous.t == 'Code' then
      result[#result] = pandoc.Code(previous.text .. candidate.text, previous.attr)
    else
      result:insert(candidate)
    end
  end

  return result
end
