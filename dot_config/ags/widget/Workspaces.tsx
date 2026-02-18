import { Gtk } from "ags/gtk4"

import Hyprland from "gi://AstalHyprland"
import { createBinding, createEffect, createState, For } from "gnim"
import GObject from "gnim/gobject"

const hyprland = Hyprland.get_default()

export default function Workspaces() {
  const workspacesProperty = createBinding(hyprland, "workspaces")
  const focusedWorkspaceId = createBinding(hyprland, "focused_workspace", "id")

  const [buttons, setButtons] = createState<GObject.Object[]>([])

  createEffect(() => {
    const sortedWorkspaces = workspacesProperty().slice()
    sortedWorkspaces.sort((a, b) => a.get_id() - b.get_id())

    const nextButtons = sortedWorkspaces.map(workspace => {
      const id = workspace.get_id()
      const idStr = id.toString()

      return (
        <button
          class={id == focusedWorkspaceId() ? "focused" : ""}
          label={idStr == "10" ? "0" : idStr}
          onClicked={() => workspace.focus()}
        />
      )
    })

    setButtons(nextButtons)
  })

  return (
    <box
      class="workspaces"
      halign={Gtk.Align.CENTER}
      hexpand={false}
    >
      <For each={buttons}>
        {(item, index) => (item)}
      </For>
    </box>
  )
}
