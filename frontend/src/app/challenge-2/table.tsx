"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Chip,
} from "@nextui-org/react";
import { CarFiltersOptionsDto, CarPaginationResult } from "@/api-types";
import { CarFilters } from "./car-filters";
import { capitalize } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CarFilterPrice } from "./car-filters -price";
import { ChangeEvent } from "react";

interface MyTableProps {
  filterOptions: CarFiltersOptionsDto;
  cars: CarPaginationResult;
}

export const MyTable: FC<MyTableProps> = ({ filterOptions, cars }) => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setPage(1);
      const params = new URLSearchParams(searchParams);

      params.set("perPage", e.target?.value.toString() || "");
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  useEffect(() => {
    const page = searchParams.get("page");
    const currentPage = page != null && page != "" ? parseInt(page, 10) : 1;
    setPage(currentPage);
  }, [searchParams]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-16">
          <div className="">
            <CarFilters label="brands" items={filterOptions.brands || []} />
          </div>
          <div className="">
            <CarFilters label="colors" items={filterOptions.colors || []} />
          </div>
          <div className="">
            <CarFilterPrice
              label="priceFrom"
              items={filterOptions.prices || []}
            />
          </div>
          <div className="">
            <CarFilterPrice label="priceTo" items={filterOptions.prices} />
          </div>
        </div>
        <div className="flex flex-wrap -mb-4 -mx-2 justify-around">
          <span className="text-default-400 text-small">
            Total <span className="font-bold">{cars.total}</span> cars
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
  }, [
    cars.total,
    filterOptions.brands,
    filterOptions.colors,
    filterOptions.prices,
    onRowsPerPageChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
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
    );
  }, [page, cars.totalPages, handlePageChange]);

  return (
    <Table
      isStriped
      aria-label="Example static collection table"
      topContent={topContent}
      bottomContent={bottomContent}
      topContentPlacement="outside"
      classNames={{
        wrapper: "min-h-[800px]",
      }}
    >
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Brand</TableColumn>
        <TableColumn>Model</TableColumn>
        <TableColumn>Year</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Color</TableColumn>
        <TableColumn>Mileage</TableColumn>
        <TableColumn>Vehicle Identification Number</TableColumn>
        <TableColumn>Lot number</TableColumn>
        <TableColumn>Country</TableColumn>
        <TableColumn>State</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Condition</TableColumn>
      </TableHeader>
      <TableBody>
        {cars.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{capitalize(item.brand)}</TableCell>
            <TableCell>{capitalize(item.model)}</TableCell>
            <TableCell>{item.year}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{capitalize(item.color)}</TableCell>
            <TableCell>{item.mileage}</TableCell>
            <TableCell>{item.vin}</TableCell>
            <TableCell>{item.lot}</TableCell>
            <TableCell>{capitalize(item.country)}</TableCell>
            <TableCell>{capitalize(item.state)}</TableCell>
            <TableCell>
              <Chip
                color={
                  item.title_status === "salvage insurance"
                    ? "warning"
                    : "success"
                }
                variant="flat"
              >
                {capitalize(item.title_status)}
              </Chip>
            </TableCell>
            <TableCell>{item.condition}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
