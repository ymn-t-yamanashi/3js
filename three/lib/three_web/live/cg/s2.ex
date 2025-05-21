defmodule ThreeWeb.CgLive.S2 do
  use ThreeWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <div id="threejs" phx-hook="Three2" phx-update="ignore"> </div>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
