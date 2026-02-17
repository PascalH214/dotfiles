import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"

import Hyprland from "gi://AstalHyprland"
import { createBinding, createEffect, createState, For } from "gnim"

const hyprland = Hyprland.get_default();

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  const workspacesProperty = createBinding(hyprland, "workspaces");

  const [workspaces, setWorkspaces] = createState<Hyprland.Workspace[]>([]);
  
  createEffect(() => {
    let sorted_workspaces = workspacesProperty();
    sorted_workspaces.sort((a, b) => a.get_id() - b.get_id());
    setWorkspaces(sorted_workspaces);
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
        halign={Gtk.Align.START}
        hexpand={false}
      >
        <For each={workspaces}>
          {(item, index) => {
            const id = item.get_id().toString();

            return <button label={id == "10" ? "0" : id}/>
          }}
        </For>
      </box>
    </window>
  )
}
