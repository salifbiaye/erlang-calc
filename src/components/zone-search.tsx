"use client"

import Select from "react-select/async"
import { debounce } from "lodash"

interface ZoneData {
  lat: number
  lon: number
    display_name: string
}

interface ZoneOption {
  value: ZoneData
  label: string
}

export function ZoneSearch({ onZoneSelect, selectedZone }: { 
  onZoneSelect: (zone: ZoneData | null) => void
  selectedZone?: ZoneData | null
}) {
  const loadOptions = async (inputValue: string) => {
    if (inputValue.length < 3) {
      return []
        }

        try {
            const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          inputValue
        )}&format=json&limit=5`
            )
            const data = await response.json()
      
      return data.map((item: any) => ({
        value: {
          lat: Number(item.lat),
          lon: Number(item.lon),
          display_name: item.display_name,
        },
        label: item.display_name,
      }))
        } catch (error) {
            console.error("Erreur lors de la recherche:", error)
      return []
        }
    }

  const debouncedLoadOptions = debounce((inputValue: string, callback: (options: ZoneOption[]) => void) => {
    loadOptions(inputValue).then(callback)
        }, 300)

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "var(--bg-color, white)",
      borderColor: "var(--border-color, rgb(51 65 85 / 0.5))",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "var(--menu-bg, white)",
      backdropFilter: "blur(8px)",
      border: "1px solid var(--border-color, rgb(51 65 85 / 0.5))",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "var(--option-hover-bg, rgb(243 244 246))" : "transparent",
      color: "var(--text-color, rgb(17 24 39))",
      cursor: "pointer",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "var(--text-color, rgb(17 24 39))",
    }),
    input: (base: any) => ({
      ...base,
      color: "var(--text-color, rgb(17 24 39))",
    }),
    }

    return (
    <div className="[--text-color:rgb(17_24_39)] [--bg-color:white] [--menu-bg:white] [--border-color:rgb(203_213_225)] [--option-hover-bg:rgb(243_244_246)] dark:[--text-color:white] dark:[--bg-color:transparent] dark:[--menu-bg:rgb(30_41_59/0.9)] dark:[--border-color:rgb(51_65_85/0.5)] dark:[--option-hover-bg:rgb(51_65_85/0.5)]">
      <Select
        className="zone-select"
        placeholder="Rechercher une zone (ville, pays...)"
        loadOptions={debouncedLoadOptions}
        onChange={(newValue) => {
          if (newValue) {
            onZoneSelect((newValue as ZoneOption).value)
          } else {
            onZoneSelect(null)
          }
        }}
        value={
          selectedZone
            ? {
                value: selectedZone,
                label: selectedZone.display_name,
              }
            : null
        }
        styles={customStyles}
        isClearable
        defaultOptions={[]}
        cacheOptions
      />
        </div>
    )
}
