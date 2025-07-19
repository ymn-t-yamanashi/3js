defmodule ThreeWeb.CgLive.Eli do
  use ThreeWeb, :live_view
  import ThreeWeb.Cg.CgHelper

  # 1列のパネル数
  @plane_count 80
  @plane_x -18
  @plane_s 2

  @impl true
  def mount(_params, _session, socket) do
    Process.send_after(self(), :update, 500)

    socket =
      socket
      |> set_size()
      |> assign(data: initialization_character_data())
      |> load_model("test", "/images/eli.vrm")
      |> add_text_plane("my_greeting", "Phoenix Framework", 20, "#CC5500")
      |> position("my_greeting", -1.7, 3.5, 0)

    {:ok, main(socket)}
  end

  @impl true
  def handle_info(:update, socket) do
    Process.send_after(self(), :update, 20)
    {:noreply, main(socket)}
  end

  def handle_event("load_model", %{"name" => "test", "status" => "completion"}, socket) do
    socket =
      socket
      |> position("test", 0, -1, 3)
      |> rotation("test", 0, 3.2, 0)

    {:noreply, socket}
  end



  defp initialization_character_data() do
    0
  end

  defp main(socket) do
    character_data = update(socket.assigns.data)

    socket
    |> rotate_arm("test", character_data)
    |> assign(data: character_data)
  end

  defp update(character_data) do
    character_data + 1
  end

end
