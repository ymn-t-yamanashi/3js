defmodule ThreeWeb.CgLive.Index do
  use ThreeWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    Process.send_after(self(), :update, 500)

    socket =
      socket
      |> assign(data: initialization_character_data())

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
    |> assign(data: character_data)
  end

  defp update(character_data) do
    character_data + 0.05
  end
end
