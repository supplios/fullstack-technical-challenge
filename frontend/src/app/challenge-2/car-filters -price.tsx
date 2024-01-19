"use client";
import React, { FC, memo } from "react";
import { CarFiltersOptionsDto } from "@/api-types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select, { SingleValue } from "react-select";

interface CarFilterPriceProps {
  label: "priceFrom" | "priceTo";
  items: CarFiltersOptionsDto["prices"];
}

export const CarFilterPrice: FC<CarFilterPriceProps> = memo(
  ({ label, items }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSelectionChange = (
      item: SingleValue<{ value: string | number; label: string | number }>
    ) => {
      const params = new URLSearchParams(searchParams);

      params.set(label, item?.value?.toString() || "");
      params.delete("page");
      params.set("page", "1");

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
          label: item,
        }))}
        onChange={handleSelectionChange}
      ></Select>
    );
  }
);

CarFilterPrice.displayName = "CarFilterPrice";
