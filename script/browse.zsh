#!/usr/bin/env zsh

# Example usage:
# $ PATH/TO/SCRIPT 2024 3
# $ PATH/TO/SCRIPT 2024 12

if [ ! "$#" = 2 ]; then
  echo "Wrong number of arguments.\n\nUsage:\n$ PATH/TO/SCRIPT YEAR DAY\n\nExample from project root:\n$ script/browse.zsh 2024 8"
  return
fi

YEAR=$1
DAY=$2

if [[ $DAY -lt 10 ]]; then
  ZERO_PADDED_DAY=0$DAY
else
  ZERO_PADDED_DAY=$DAY
fi

SCRIPT_FOLDER=$(dirname $0)
PROMPT_FILEPATH=$SCRIPT_FOLDER/../$YEAR/prompts/$ZERO_PADDED_DAY.html

cat $PROMPT_FILEPATH \
  | npx html-minifier --collapse-whitespace --remove-tag-whitespace \
  | pandoc --from=html --to=markdown_strict+backtick_code_blocks --lua-filter=$SCRIPT_FOLDER/code_block.lua --wrap=none \
  | sed 's/\ \([.,:;!?)]\)/\1/g' \
  | sed 's/\([(]\) \([`*]\)/\1\2/g' \
  | sed 's/\([`*]\) \([)]\)/\1\2/g' \
  | sed 's/\([^ ][-]\) \([`*]\)/\1\2/g' \
  | sed 's/\([`*]\) \([-][^ ]\)/\1\2/g' \
  | glow -p -s $SCRIPT_FOLDER/glow.json
