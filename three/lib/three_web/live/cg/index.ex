defmodule ThreeWeb.CgLive.Index do
  use ThreeWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    Process.send_after(self(), :update, 250)
    {:ok, main(socket)}
  end

  @impl true
  def handle_info(:update, socket) do
    Process.send_after(self(), :update, 250)
    {:noreply, main(socket)}
  end

  defp main(socket) do
    t = DateTime.utc_now()
    |> to_string()
    |> IO.inspect()

    socket =
      socket
      |> assign(data: t)

  end
end
