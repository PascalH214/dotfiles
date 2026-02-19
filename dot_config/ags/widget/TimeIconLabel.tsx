import { Accessor } from "gnim";

import Icon from "./Icon";

export interface TimeLabelProps {
  className?: string
  imageName: string,
  time: Accessor<string> | string;
}

export function TimeIconLabelDividingLine() {
  return (
    <box class="time-label-spacing" />
  )
}

export default function TimeIconLabel({ className, imageName, time }: TimeLabelProps) {
  return (
    <box class={"time-label " + className }>
      <Icon imageName={imageName} pixelSize={20} />
      <label label={time} />
    </box>
  )
}