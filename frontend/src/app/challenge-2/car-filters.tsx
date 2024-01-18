"use client";
import React, { FC, memo } from "react";
import { CarFiltersOptionsDto } from "@/api-types";
import { capitalize } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select, { SingleValue } from "react-select";

interface CarFiltersProps {
  label: "brand" | "price" | "color";
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
    item: SingleValue<{ value: string | number; label: string | number }>
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set(label, item?.value.toString() || "");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      height={90}
      itemCount={items.length}
      itemSize={80}
      initialScrollOffset={0}
      options={items.map((item) => ({
        value: item,
        label: typeof item === "number" ? item : capitalize(item.toString()),
      }))}
      onChange={handleSelectionChange}
    ></Select>
  );

  // return (
  //   <Select
  //     scrollRef={scrollerRef}
  //     label={`${capitalize(label)}:`}
  //     labelPlacement="outside"
  //     placeholder={`Select a ${label}`}
  //     className="max-w-xs"
  //     onChange={(e) => handleSelectionChange(e)}
  //     isLoading={isLoading}
  //     onOpenChange={setIsOpen}
  //   >
  //     {items2.map((item, index) => (
  //       <SelectItem key={item} value={item} textValue={item.toString()}>
  //         {capitalize(item.toString())}
  //       </SelectItem>
  //     ))}
  //   </Select>
  // );
});

CarFilters.displayName = "CarFilters";
