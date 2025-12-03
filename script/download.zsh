#!/usr/bin/env zsh

# Example usage:
# $ PATH/TO/SCRIPT 2024 3
# $ PATH/TO/SCRIPT 2024 12

source .env

if [[ -z "${AOC_SESSION_COOKIE}" ]]; then
  echo 'Error: AoC session cookie not set in .env'
  exit 1
fi

if [[ -z "${ASSETS_REPO}" ]]; then
  echo 'Error: assets repo not set in .env'
  exit 1
fi

if [ ! "$#" = 2 ]; then
  echo "Wrong number of arguments.\n\nUsage:\n$ PATH/TO/SCRIPT YEAR DAY\n\nExample from project root:\n$ script/download.zsh 2024 8"
  exit 1
fi

YEAR=$1
DAY=$2

if [[ $DAY -lt 10 ]]; then
  ZERO_PADDED_DAY=0$DAY
else
  ZERO_PADDED_DAY=$DAY
fi

SCRIPT_FOLDER=$(dirname $0)
YEAR_FOLDER=$ASSETS_REPO/$YEAR
BASE_URL=https://adventofcode.com/$YEAR/day/$DAY
AOC_COOKIE="cookie: session=${AOC_SESSION_COOKIE}"

mkdir -p $YEAR_FOLDER/input $YEAR_FOLDER/prompts

function download_prompt() {
  echo "Downloading prompt..."

  TARGET_FILEPATH=$YEAR_FOLDER/prompts/$ZERO_PADDED_DAY.html

  echo "<pre>" > $TARGET_FILEPATH
  cat $SCRIPT_FOLDER/../art/$ZERO_PADDED_DAY >> $TARGET_FILEPATH
  echo "</pre>" >> $TARGET_FILEPATH
  echo "<a href=\"$BASE_URL\">Open on web</a>" >> $TARGET_FILEPATH
  curl -sS $BASE_URL -H $AOC_COOKIE | pup -p -i 0 --pre article >> $TARGET_FILEPATH
}

function download_input() {
  TARGET_FILEPATH=$YEAR_FOLDER/input/$ZERO_PADDED_DAY

  [ -e $TARGET_FILEPATH ] && return

  echo "Downloading input..."

  curl -sS $BASE_URL/input -H $AOC_COOKIE \
    | perl -pe 'chomp if eof' > $TARGET_FILEPATH
}

download_prompt
download_input
