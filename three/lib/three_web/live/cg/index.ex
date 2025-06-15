defmodule ThreeWeb.CgLive.Index do
  use ThreeWeb, :live_view
  import ThreeWeb.Cg.CgHelper

  @impl true
  def mount(_params, _session, socket) do
    Process.send_after(self(), :update, 500)

    socket =
      socket
      |> assign(data: initialization_character_data())
      |> add_cube("cube", 1, 2, 1, "#AA0000")
      |> position("cube", 1, 2, 1)
      |> add_cube("cube1", 1, 2, 1, "#00AA00")
      |> position("cube1", -1, 1, 1)

    {:ok, main(socket)}
  end

  @impl true
  def handle_info(:update, socket) do
    Process.send_after(self(), :update, 12)
    {:noreply, main(socket)}
  end

  defp initialization_character_data() do
    0
  end

  defp main(socket) do
    character_data =
      update(socket.assigns.data)
      |> IO.inspect()

    socket
    |> rotation("cube1", character_data, 1, 1)
    |> rotation("cube", 1, 1, character_data)
    |> assign(data: character_data)
  end

  defp update(character_data) do
    character_data + 0.05
  end
end
