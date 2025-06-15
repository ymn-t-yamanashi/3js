defmodule ThreeWeb.Cg.CgHelper do
  use Phoenix.LiveView

  def add_cube(socket, name, x, y, z, color) do
    push_event(socket, "addCube", %{name: name, x: x, y: y, z: z, color: color})
  end

  def rotation(socket, name, x, y, z) do
    push_event(socket, "rotation", %{name: name, x: x, y: y, z: z})
  end

  def position(socket, name, x, y, z) do
    push_event(socket, "position", %{name: name, x: x, y: y, z: z})
  end
end
