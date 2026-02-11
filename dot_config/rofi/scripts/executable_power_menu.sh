#!/usr/bin/env bash

if [ x"$@" = x"hibernate" ]; then
  hyprlock &
  sleep 1
  systemctl hibernate
  exit 0
elif [ x"$@" = x"suspend" ]; then
  hyprlock &
  sleep 1
  systemctl suspend
  exit 0
elif [ x"$@" = x"lock" ]; then
  hyprlock &
  exit 0
elif [ x"$@" = x"logout" ]; then
  hyprctl dispatch exit
  exit 0
elif [ x"$@" = x"reboot" ]; then
  systemctl reboot
  exit 0
elif [ x"$@" = x"shutdown" ]; then
  systemctl poweroff
  exit 0
fi

echo -en "\0prompt\x1f\n"

echo -en "shutdown\0icon\x1f./icons/shutdown.svg\n"
echo -en "reboot\0icon\x1f./icons/reboot.svg\n"
echo -en "logout\0icon\x1f./icons/logout.svg\n"
echo -en "lock\0icon\x1f./icons/lock.svg\n"
echo -en "suspend\0icon\x1f./icons/suspend.svg\n"
echo -en "hibernate\0icon\x1f./icons/hibernate.svg\n"
