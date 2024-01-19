import React from "react";

import { MyTable, TableLocation } from "./table-location";
import { carsApi } from "@/api";

interface SearchParams {
  perPage?: number;
  page: number;
}

async function getResult(searchParams: SearchParams) {
  try {
    const res = await carsApi.findCarsGroupedByLocation(
      Number(searchParams.perPage) || undefined,
      Number(searchParams.page) || 1
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);

    throw new Error("Failed to fetch data");
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { perPage, page } = searchParams;

  const carGroupedByLocationPaginatedResult = await getResult({
    perPage,
    page,
  });

  return <TableLocation cars={carGroupedByLocationPaginatedResult || {}} />;
}
