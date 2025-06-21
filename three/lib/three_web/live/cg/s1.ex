defmodule ThreeWeb.CgLive.S1 do
  use ThreeWeb, :live_view
  import ThreeWeb.Cg.CgHelper

  # 1列のパネル数
  @plane_count 80
  @plane_x -8
  @plane_s 2

  @impl true
  def mount(_params, _session, socket) do
    Process.send_after(self(), :update, 500)

    socket =
      socket
      |> assign(data: initialization_character_data())
      |> add_planes()
      |> add_plane("logo_plane", 0.71 / 2, 0.48 / 2, "#FFFFFF")
      |> position("logo_plane", -4.3, 3.5, 0)
      |> load_texture("logo", "/images/logo.png")
      |> load_texture("t1", "/images/t1.jpg")
      |> load_model("test", "/images/test.vrm")
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
      |> position("test", -2.5, 0, 1)
      |> rotation("test", -2, 0, -1.6)

    {:noreply, socket}
  end

  def handle_event("load_texture", %{"name" => "logo", "status" => "completion"}, socket) do
    socket =
      socket
      |> set_texture("logo_plane", "logo")

    {:noreply, socket}
  end

  def handle_event("load_texture", %{"name" => "t1", "status" => "completion"}, socket) do
    socket =
      socket
      |> set_textures()

    {:noreply, socket}
  end

  defp initialization_character_data() do
    0
  end

  defp main(socket) do
    character_data = update(socket.assigns.data)

    socket
    |> positions(-character_data)
    |> set_text_plane_text("my_greeting", "Phoenix Framework  #{DateTime.utc_now()}", 20, "#CC5500")
    |> assign(data: character_data)
  end

  defp update(character_data) do
    if character_data >= 2, do: 0, else:  character_data + 0.01
  end

  defp add_planes(socket) do
    Enum.reduce(1..@plane_count, socket, fn x, acc ->
      acc
      |> add_plane("bg_#{x}", @plane_s, @plane_s, "#666666")
      |> add_plane("bg_a#{x}", @plane_s, @plane_s, "#333333")
      |> add_plane("bg_b#{x}", @plane_s, @plane_s, "#111111")
    end)
  end

  defp set_textures(socket) do
    Enum.reduce(1..@plane_count, socket, fn x, acc ->
      set_texture(acc, "bg_#{x}", "t1")
      |> set_texture("bg_a#{x}", "t1")
      |> set_texture("bg_b#{x}", "t1")
    end)
  end

  defp positions(socket, add_x) do

    Enum.reduce(1..@plane_count, socket, fn x, acc ->
      base = @plane_x  + x * @plane_s

      bg_x =  base + add_x * 64
      bg_ax =  base + add_x  * 16
      bg_bx = base + add_x * 4

      position(acc, "bg_#{x}", bg_x, -4, -2)
      |> position("bg_a#{x}", bg_ax, -2, -2)
      |> position("bg_b#{x}", bg_bx, 0, -2)
    end)

    # socket
  end
end
