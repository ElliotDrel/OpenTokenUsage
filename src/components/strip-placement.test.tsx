import { useState } from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { expect, it, vi } from "vitest"
import { StripPlacement } from "@/components/strip-placement"

it("selects either side and accepts only whole, bounded offsets", () => {
  const onChange = vi.fn()
  function Controls() {
    const [placement, setPlacement] = useState({ position: "right" as "left" | "right", offset: 8 })
    return (
      <StripPlacement
        {...placement}
        onChange={(patch) => {
          onChange(patch)
          setPlacement((previous) => ({ ...previous, ...patch }))
        }}
      />
    )
  }
  render(<Controls />)
  expect(screen.getByRole("radio", { name: "Right" })).toHaveAttribute("aria-checked", "true")
  fireEvent.click(screen.getByRole("radio", { name: "Left" }))
  expect(onChange).toHaveBeenLastCalledWith({ position: "left" })
  expect(screen.getByRole("radio", { name: "Left" })).toHaveAttribute("aria-checked", "true")
  fireEvent.click(screen.getByRole("radio", { name: "Right" }))
  expect(onChange).toHaveBeenLastCalledWith({ position: "right" })

  const input = screen.getByRole("spinbutton", { name: "Offset (px)" })
  fireEvent.change(input, { target: { value: "120" } })
  expect(onChange).toHaveBeenLastCalledWith({ offset: 120 })
  expect(input).toHaveValue(120)
  onChange.mockClear()
  for (const value of ["", "-1", "1.5", "4097"]) fireEvent.change(input, { target: { value } })
  expect(onChange).not.toHaveBeenCalled()
  for (const value of ["0", "4096"]) {
    fireEvent.change(input, { target: { value } })
    expect(onChange).toHaveBeenLastCalledWith({ offset: Number(value) })
  }
})
