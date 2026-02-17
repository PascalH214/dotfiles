#!/usr/bin/env bash

target_workspace="9"

mapfile -t addresses < <(
  hyprctl clients 2>/dev/null | awk '
    /^Window / {
      addr = $2
      gsub(/->/, "", addr)
      cls = ""
      ws = ""
    }
    /^[[:space:]]*workspace:/ {
      ws = $2
    }
    /^[[:space:]]*class:/ {
      cls = tolower($2)
    }
    cls != "" && ws != "" && addr != "" {
      if ((cls == "steam" || cls == "discord") && ws != "9") {
        print addr
      }
      addr = ""
      cls = ""
      ws = ""
    }
  '
)

for address in "${addresses[@]}"; do
  hyprctl dispatch movetoworkspacesilent "$target_workspace,address:0x$address" >/dev/null 2>&1
done