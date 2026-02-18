import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"

import Hyprland from "gi://AstalHyprland"
import { createBinding, createEffect, createState, For } from "gnim"
import GObject from "gnim/gobject";

const hyprland = Hyprland.get_default();

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  const workspacesProperty = createBinding(hyprland, "workspaces");
  const focusedWorkspaceId = createBinding(hyprland, "focused_workspace", "id")

  const [buttons, setButtons] = createState<GObject.Object[]>([]);
  
  createEffect(() => {
    const sorted_workspaces = workspacesProperty().slice();
    sorted_workspaces.sort((a, b) => a.get_id() - b.get_id());

    const this_buttons = sorted_workspaces.map(workspace => {
      const id = workspace.get_id();
      const idStr = id.toString();
      
      return (
        <button 
          class={id == focusedWorkspaceId() ? "focused" : ""}
          label={idStr == "10" ? "0" : idStr}
          onClicked={() => workspace.focus()}
        />
      )
    });

    setButtons(this_buttons);
  })

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <box
        class="workspaces"
        halign={Gtk.Align.CENTER}
        hexpand={false}
      >
        <For each={buttons}>
          {(item, index) => (item)
          }
        </For>
      </box>
    </window>
  )
}
