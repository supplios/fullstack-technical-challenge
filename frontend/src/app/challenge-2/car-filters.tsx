"use client";
import React, { FC, memo, useMemo } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { CarFiltersOptionsDto } from "@/api-types";

interface CarFiltersProps {
  label: "Brand" | "Price" | "Color";
  items:
    | CarFiltersOptionsDto["brands"]
    | CarFiltersOptionsDto["prices"]
    | CarFiltersOptionsDto["colors"];
}

export const CarFilters: FC<CarFiltersProps> = memo(({ label, items }) => {
  return (
    <Select
      label={`${label}:`}
      labelPlacement="outside"
      placeholder="Select a brand"
      className="max-w-xs"
    >
      {items.map((item) => (
        <SelectItem
          key={item}
          value={item}
          textValue={item.toString()}
          onClick={() => alert("there you go")}
        >
          {item}
        </SelectItem>
      ))}
    </Select>
  );
});

CarFilters.displayName = "CarFilters";
