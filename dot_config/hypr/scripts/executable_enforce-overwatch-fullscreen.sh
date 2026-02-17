#!/usr/bin/env bash

mapfile -t addresses < <(
  hyprctl clients 2>/dev/null | awk '
    /^Window / {
      addr = $2
      gsub(/->/, "", addr)
      cls = ""
      title = ""
      fullscreen = ""
    }
    /^[[:space:]]*class:/ {
      cls = tolower($2)
    }
    /^[[:space:]]*title:/ {
      title = tolower(substr($0, index($0, ":") + 2))
    }
    /^[[:space:]]*fullscreen:/ {
      fullscreen = $2
    }
    cls != "" && title != "" && fullscreen != "" && addr != "" {
      if (cls == "gamescope" && title ~ /overwatch/ && fullscreen != "2") {
        print addr
      }
      addr = ""
      cls = ""
      title = ""
      fullscreen = ""
    }
  '
)

for address in "${addresses[@]}"; do
  hyprctl dispatch fullscreenstate "2 2,address:0x$address" >/dev/null 2>&1
done