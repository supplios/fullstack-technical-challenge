import React from "react";

import { MyTable } from "./table";
import { carsApi } from "@/api";

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

async function getData() {
  try {
    const res = await carsApi.getCarsFilters(true, true, true);
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

async function getResult(searchParams: {
  price: string;
  color: string;
  brand: string;
}) {
  try {
    const res = await carsApi.findCars(
      Number(searchParams.price),
      searchParams.color,
      searchParams.brand
    );
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function App({
  searchParams,
}: {
  searchParams: {
    price: string;
    color: string;
    brand: string;
  };
}) {
  const color = searchParams?.color;
  const price = searchParams?.price;
  const brand = searchParams?.brand;

  // const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
  //   new Set(INITIAL_VISIBLE_COLUMNS)
  // );

  const pages = 10;
  const data = await getData();

  const cars = await getResult({ price, color, brand });

  // const hasSearchFilter = Boolean(filterValue);

  // const headerColumns = React.useMemo(() => {
  //   if (visibleColumns === "all") return columns;

  //   return columns.filter((column) =>
  //     Array.from(visibleColumns).includes(column.uid)
  //   );
  // }, [visibleColumns]);

  return <MyTable filterOptions={data} cars={cars || []} />;
}
