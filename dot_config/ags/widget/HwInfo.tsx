import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

const cpuCmd = `env -u BASH_ENV bash --noprofile --norc -c '
read cpu u n s i iw ir sir st g gn < /proc/stat
sleep 1
read cpu2 u2 n2 s2 i2 iw2 ir2 sir2 st2 g2 gn2 < /proc/stat

idle1=$((i + iw))
idle2=$((i2 + iw2))

total1=$((u + n + s + i + iw + ir + sir + st))
total2=$((u2 + n2 + s2 + i2 + iw2 + ir2 + sir2 + st2))

dt=$((total2 - total1))
di=$((idle2 - idle1))

awk -v dt="$dt" -v di="$di" "BEGIN {
  if (dt <= 0) { printf \\"0.00\\\\n\\"; exit }
  printf \\"%.2f\\\\n\\", (dt - di) * 100 / dt
}"
'`


export default function HwInfo(props: Partial<Gtk.Box.ConstructorProps> = {}) {
  const cpu = createPoll("0.00", 2000, cpuCmd)

  return (
    <box name="hw-info" class="hw-info" $type="start" {...props}>
      <label label={cpu((v) => `CPU: ${v}%`)} />
    </box>
  )
}