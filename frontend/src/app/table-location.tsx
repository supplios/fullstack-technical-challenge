'use client';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import {
  Pagination,
  Button,
  Card,
  CardBody,
  Image,
  CardHeader,
  Avatar,
} from '@nextui-org/react';
import { CarGroupedByLocationResult } from '@/api-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface MyTableProps {
  cars: CarGroupedByLocationResult;
}

export const TableLocation: FC<MyTableProps> = ({ cars }) => {
  const [page, setPage] = React.useState(1);
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPage(1);
      const params = new URLSearchParams(searchParams);

      params.set('perPage', e.target?.value.toString() || '');
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  useEffect(() => {
    const page = searchParams.get('page');
    const currentPage = page != null && page != '' ? parseInt(page, 10) : 1;
    setPage(currentPage);
  }, [searchParams]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap -mb-4 -mx-2 justify-around">
          <span className="text-default-400 text-small">
            Total {cars.total} cars
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [cars.total, onRowsPerPageChange]);

  return (
    <div className="flex gap-4  p-6 flex-col bg-white h-[calc(100vh-86px)] rounded">
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
        {cars.data.map((item, index) => (
          <Card
            shadow="sm"
            className="py-4 rounded"
            key={item.state}
            isPressable
            onPress={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('ids');
              params.delete('page');

              if (Array.isArray(item.ids)) {
                item.ids.forEach((id) => {
                  params.append('ids', id.toString());
                });
              }
              push(`/cars/details?${params.toString()}`);
            }}
          >
            <CardHeader className="pb-0 pt-2 px-4 justify-between items-start">
              <div className="flex flex-col items-start">
                <p className="text-tiny uppercase font-bold">{item.state}</p>
                <small className="text-default-500">{item.country}</small>
                <h4 className="font-bold text-large">{item.count}</h4>
              </div>
              <div className="flex flex-col items-end gap-8">
                <Avatar src="/assets/flags/US.svg" size="sm" />
                {/* <Button size="sm" color="primary">
                  Show Cars
                </Button> */}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center pt-8">
        <span className="w-[30%] text-small text-default-400"></span>
        <Pagination
          showControls
          showShadow
          color="primary"
          page={page}
          total={cars.totalPages}
          onChange={(page) => handlePageChange(page)}
        />
        <div className="sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={page >= cars.totalPages}
            size="sm"
            variant="flat"
            onPress={() => handlePageChange(page + 1)}
          >
            Previous
          </Button>
          <Button
            isDisabled={page >= cars.totalPages}
            size="sm"
            variant="flat"
            onPress={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
