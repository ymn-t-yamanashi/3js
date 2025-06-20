defmodule ThreeWeb.CgLive.Index do
  use ThreeWeb, :live_view
  import ThreeWeb.Cg.CgHelper

  @impl true
  def mount(_params, _session, socket) do
    Process.send_after(self(), :update, 500)

    socket =
      socket
      |> assign(data: initialization_character_data())
      |> add_cube("cube", 1, 1, 1, "#555555")
      |> position("cube", 1, 2, 0)
      |> add_cube("cube1", 1, 1, 1, "#777777")
      |> position("cube1", -2, -1, 0)
      |> load_texture("texture", "https://threejs.org/examples/textures/crate.gif")
      |> load_model("test", "images/test.vrm")
      |> load_model("test1", "images/test.vrm")

    {:ok, main(socket)}
  end

  @impl true
  def handle_info(:update, socket) do
    Process.send_after(self(), :update, 12)
    {:noreply, main(socket)}
  end

  def handle_event("load_model", %{"name" => "test", "status" => "completion"}, socket) do
    socket =
      socket
      |> position("test", 1, -1, 3)

    {:noreply, socket}
  end

  def handle_event("load_model", %{"name" => "test1", "status" => "completion"}, socket) do
    socket =
      socket
      |> position("test1", 0, 0, 0)

    {:noreply, socket}
  end

  def handle_event("load_texture", %{"name" => "texture", "status" => "completion"}, socket) do
    socket =
      socket
      |> set_texture("cube1", "texture")

    {:noreply, socket}
  end

  defp initialization_character_data() do
    0
  end

  defp main(socket) do
    character_data = update(socket.assigns.data)
    # |> IO.inspect()

    socket
    |> rotation("cube1", character_data, 0, 0)
    |> rotation("cube", 0, 0, character_data)
    |> rotation("test", 0, character_data / 4, 0)
    |> rotation("test1", 0, -character_data * 3, 0)
    |> assign(data: character_data)
  end

  defp update(character_data) do
    character_data + 0.05
  end
end
