import { SegmentedControl } from "@/components/settings-section"
import { t } from "@/lib/i18n"
import type { SettingOption, TaskbarStripStyle } from "@/lib/settings"

const POSITIONS: SettingOption<TaskbarStripStyle["position"]>[] = [
  { value: "left", labelKey: "settings.strip.positionLeft" },
  { value: "right", labelKey: "settings.strip.positionRight" },
]

export function StripPlacement({
  position,
  offset,
  onChange,
}: {
  position: TaskbarStripStyle["position"]
  offset: number
  onChange: (patch: Partial<TaskbarStripStyle>) => void
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className="mb-1 text-xs text-muted-foreground">{t("settings.strip.position")}</div>
        <SegmentedControl
          options={POSITIONS}
          value={position}
          onChange={(next) => onChange({ position: next })}
          ariaLabel={t("settings.strip.position")}
        />
      </div>
      <label className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        {t("settings.strip.offset")}
        <input
          type="number"
          min={0}
          max={4096}
          step={1}
          value={offset}
          className="fluent-control w-24"
          onChange={(event) => {
            const next = event.currentTarget.valueAsNumber
            if (Number.isInteger(next) && next >= 0 && next <= 4096) onChange({ offset: next })
          }}
        />
      </label>
      <p className="text-xs text-muted-foreground">{t("settings.strip.positionHint")}</p>
    </div>
  )
}
