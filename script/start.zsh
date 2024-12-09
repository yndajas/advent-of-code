#!/usr/bin/env zsh

# Example usage:
# $ PATH/TO/SCRIPT 2024 3
# $ PATH/TO/SCRIPT 2024 12

if [ ! "$#" = 2 ]; then
  echo "Wrong number of arguments.\n\nUsage:\n$ PATH/TO/SCRIPT YEAR DAY\n\nExample from project root:\n$ script/start.zsh 2024 8"
  return
fi

YEAR=$1
DAY=$2

SCRIPT_FOLDER=$(dirname $0)

$SCRIPT_FOLDER/download.zsh $YEAR $DAY
$SCRIPT_FOLDER/browse.zsh $YEAR $DAY
