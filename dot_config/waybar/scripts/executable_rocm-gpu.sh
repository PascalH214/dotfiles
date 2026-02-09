#!/usr/bin/env bash
set -euo pipefail

mode="${1:-usage}"

export ROCM_SMI_OUTPUT
ROCM_SMI_OUTPUT="$(rocm-smi --showtemp --showuse --json 2>/dev/null || true)"

python3 - "$mode" <<'PY'
import json
import sys
import os

mode = sys.argv[1]
raw = os.environ.get("ROCM_SMI_OUTPUT", "")
start = raw.find("{")
if start == -1:
    sys.exit(0)

try:
    data = json.loads(raw[start:].strip())
except json.JSONDecodeError:
    sys.exit(0)

def parse_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None

cards = []
for key, info in data.items():
    if not key.startswith("card"):
        continue
    gpu_use = parse_float(info.get("GPU use (%)"))
    temp_edge = parse_float(info.get("Temperature (Sensor edge) (C)"))
    temp_junction = parse_float(info.get("Temperature (Sensor junction) (C)"))
    temp_memory = parse_float(info.get("Temperature (Sensor memory) (C)"))
    cards.append(
        {
            "key": key,
            "gpu_use": gpu_use,
            "temp_edge": temp_edge,
            "temp_junction": temp_junction,
            "temp_memory": temp_memory,
            "has_mem": temp_memory is not None,
            "has_junction": temp_junction is not None,
        }
    )

if not cards:
    sys.exit(0)

# Prefer the external GPU: pick a card that reports memory or junction sensors.
def rank(card):
    return (
        1 if card["has_mem"] else 0,
        1 if card["has_junction"] else 0,
        card["gpu_use"] if card["gpu_use"] is not None else -1.0,
        card["temp_edge"] if card["temp_edge"] is not None else -1.0,
    )

card = max(cards, key=rank)

if mode == "usage":
    value = card["gpu_use"]
elif mode == "temp":
    value = card["temp_junction"] if card["temp_junction"] is not None else card["temp_edge"]
else:
    value = None

if value is None:
    sys.exit(0)

if abs(value - int(value)) < 0.05:
    output = str(int(round(value)))
else:
    output = f"{value:.1f}"

sys.stdout.write(output)
PY
