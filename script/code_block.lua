function CodeBlock(element)
  -- Wrap the content of the code block in triple backticks
  return pandoc.RawBlock('markdown', '```\n' .. element.text .. '\n```')
end
