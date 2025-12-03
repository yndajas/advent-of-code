#!/usr/bin/env zsh

# Example usage:
# $ PATH/TO/SCRIPT 2024 3
# $ PATH/TO/SCRIPT 2024 12

source .env

if [[ -z "${ASSETS_REPO}" ]]; then
  echo 'Error: assets repo not set in .env'
  exit 1
fi

if [[ -n "$(git -C ${ASSETS_REPO} status --porcelain)" ]]; then
  echo 'Warning: assets repo has uncommitted changes'
elif ! git -C "${ASSETS_REPO}" diff "@{upstream}" --quiet; then
  echo 'Warning: assets repo has unpushed changes'
fi

if [ ! "$#" = 2 ]; then
  echo "Wrong number of arguments.\n\nUsage:\n$ PATH/TO/SCRIPT YEAR DAY\n\nExample from project root:\n$ script/start.zsh 2024 8"
  exit 1
fi

YEAR=$1
DAY=$2

SCRIPT_FOLDER=$(dirname $0)

$SCRIPT_FOLDER/download.zsh $YEAR $DAY && \
$SCRIPT_FOLDER/browse.zsh $YEAR $DAY
