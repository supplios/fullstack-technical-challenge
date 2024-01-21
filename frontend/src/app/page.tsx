import React from 'react';

import { TableLocation } from './table-location';
import { carsApi } from '@/api';
import { TopNav } from '@/components/sidebar/header';

interface SearchParams {
  perPage?: number;
  page: number;
}

async function getResult(searchParams: SearchParams) {
  try {
    const res = await carsApi.findCarsGroupedByLocation(
      Number(searchParams.perPage) || undefined,
      Number(searchParams.page) || 1,
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);

    throw new Error('Failed to fetch data');
  }
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { perPage, page } = searchParams;

  const carGroupedByLocationPaginatedResult = await getResult({
    perPage,
    page,
  });

  return (
    <>
      <TopNav title="Home" />
      <TableLocation cars={carGroupedByLocationPaginatedResult || {}} />
    </>
  );
};

export default Page;
