import React from "react";

import { MyTable } from "./table";
import { carsApi } from "@/api";

interface SearchParams {
  colors?: string[];
  priceFrom?: number;
  priceTo?: number;
  brands?: string[];
  perPage?: number;
  page: number;
}

async function getData() {
  try {
    const res = await carsApi.getCarsFilters(true, true, true);
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error("Failed to fetch data");
  }
}

async function getResult(searchParams: SearchParams) {
  try {
    const res = await carsApi.findCars(
      Number(searchParams.priceFrom) || undefined,
      Number(searchParams.priceTo) || undefined,
      searchParams.colors,
      searchParams.brands,
      Number(searchParams.perPage) || undefined,
      Number(searchParams.page) || 1
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);

    throw new Error("Failed to fetch data");
  }
}

export default async function App({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { colors, priceFrom, priceTo, brands, perPage, page } = searchParams;

  const pages = 10;
  const data = await getData();

  const carPaginatedResult = await getResult({
    priceFrom,
    priceTo,
    colors,
    brands,
    perPage,
    page,
  });

  return <MyTable filterOptions={data} cars={carPaginatedResult || {}} />;
}
