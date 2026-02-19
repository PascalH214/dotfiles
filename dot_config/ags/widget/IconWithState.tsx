import type { Accessor } from "gnim"
import Icon from "./Icon"

interface IconWithStateProps extends Omit<JSX.IntrinsicElements["image"], "file"> {
  states?: string[],
  state: Accessor<number> | number,
  imageGroup: string,
  fileEnding?: string,
  pixelSize?: number
}

export default function IconWithState({
  states = ["normal", "warning", "critical"],
  state,
  imageGroup,
  fileEnding = ".svg",
  ...props
}: IconWithStateProps) {
  const imageName =
    typeof state === "function"
      ? state((value) => `${imageGroup}-${states[value]}`)
      : `${imageGroup}-${states[state]}`

  return (
    <Icon
      {...props}
      imageSubFolder={imageGroup}
      imageName={imageName}
      fileEnding={fileEnding}
    />
  )
}