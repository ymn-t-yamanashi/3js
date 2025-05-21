defmodule ThreeWeb.CgLive.S3 do
  use ThreeWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <div id="threejs" phx-hook="Three3" phx-update="ignore" phx-window-keydown="keydown" phx-throttle="1"> </div>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(x: 0)

    {:ok, socket}
  end

  def handle_event("keydown", %{"key" => "ArrowRight"}, socket) do
    IO.inspect("-->")
    x = socket.assigns.x + 0.1

    socket =
      socket
      |> assign(x: x)
      |> push_event("move", %{x: x})

    {:noreply, socket}
  end

  def handle_event("keydown", %{"key" => "ArrowLeft"}, socket) do
    IO.inspect("<--")
    x = socket.assigns.x - 0.1

    socket =
      socket
      |> assign(x: x)
      |> push_event("move", %{x: x})

    {:noreply, socket}
  end

  def handle_event("keydown", _, socket) do
    {:noreply, socket}
  end
end
