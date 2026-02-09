#!/usr/bin/env bash
set -euo pipefail

hwmon_dir=""
for dir in /sys/class/hwmon/hwmon*; do
  if [ -r "$dir/name" ] && [ "$(cat "$dir/name")" = "k10temp" ]; then
    hwmon_dir="$dir"
    break
  fi
done

if [ -z "$hwmon_dir" ]; then
  exit 0
fi

sensor="$hwmon_dir/temp1_input"
if [ ! -r "$sensor" ]; then
  exit 0
fi

value=$(cat "$sensor")
awk -v v="$value" 'BEGIN { printf("%d", v / 1000) }'
