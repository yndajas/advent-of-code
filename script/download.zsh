#!/usr/bin/env zsh

# Example usage:
# $ PATH/TO/SCRIPT 2024 3
# $ PATH/TO/SCRIPT 2024 12

if [ ! "$#" = 2 ]; then
  echo "Wrong number of arguments.\n\nUsage:\n$ PATH/TO/SCRIPT YEAR DAY\n\nExample from project root:\n$ script/download.zsh 2024 8"
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
BASE_URL=https://adventofcode.com/$YEAR/day/$DAY
AOC_COOKIE="cookie: $(cookies https://adventofcode.com)"

function download_prompt() {
  echo "Downloading prompt..."

  TARGET_FILEPATH=$SCRIPT_FOLDER/../$YEAR/prompts/$ZERO_PADDED_DAY.html

  curl -sS $BASE_URL -H $AOC_COOKIE | pup -p -i 0 --pre article > $TARGET_FILEPATH

  sed -i "" "1i\\
<a href=\"$BASE_URL\">Open on web</a>\\
\\
" $TARGET_FILEPATH
}

function download_input() {
  TARGET_FILEPATH=$SCRIPT_FOLDER/../$YEAR/input/$ZERO_PADDED_DAY

  [ -e $TARGET_FILEPATH ] && return

  echo "Downloading input..."

  curl -sS $BASE_URL/input -H $AOC_COOKIE \
    | perl -pe 'chomp if eof' > $TARGET_FILEPATH
}

download_prompt
download_input
