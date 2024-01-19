"use client";
import React, { FC, memo } from "react";
import { CarFiltersOptionsDto } from "@/api-types";
import { capitalize } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select, { SingleValue } from "react-select";

interface CarFiltersProps {
  label: "brands" | "priceFrom" | "priceTo" | "colors";
  items:
    | CarFiltersOptionsDto["brands"]
    | CarFiltersOptionsDto["prices"]
    | CarFiltersOptionsDto["colors"];
}

export const CarFilters: FC<CarFiltersProps> = memo(({ label, items }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSelectionChange = (
    items: SingleValue<{ value: string | number; label: string | number }[]>
  ) => {
    const params = new URLSearchParams(searchParams);

    params.delete(label);
    params.delete("page");

    if (items && Array.isArray(items)) {
      // Iterate over the array and append each item to the params
      items.forEach((item) => {
        params.append(label, item.value.toString());
      });
    }

    params.append("page", "1");

    // Replace the URL with the new query parameters
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      height={90}
      itemCount={items.length}
      itemSize={5}
      initialScrollOffset={0}
      options={items.map((item) => ({
        value: item,
        label: typeof item === "number" ? item : capitalize(item.toString()),
      }))}
      isMulti={true}
      onChange={handleSelectionChange}
    ></Select>
  );
});

CarFilters.displayName = "CarFilters";
