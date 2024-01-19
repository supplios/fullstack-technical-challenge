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
import { CarFiltersOptionsDto, CarGroupedByLocationResult } from "@/api-types";
import { capitalize } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MyTableProps {
  cars: CarGroupedByLocationResult;
}

export const TableLocation: FC<MyTableProps> = ({ cars }) => {
  const [page, setPage] = React.useState(1);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    console.log("use effect", currentPage);
  }, [searchParams]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      console.log("handleClick");
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
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
    >
      <TableHeader>
        <TableColumn>State</TableColumn>
        <TableColumn>Country</TableColumn>
        <TableColumn>Number of cars</TableColumn>
        <TableColumn>
          <span />
        </TableColumn>
      </TableHeader>
      <TableBody>
        {cars.data.map((item) => (
          <TableRow key={item.state}>
            <TableCell>{capitalize(item.country)}</TableCell>
            <TableCell>{capitalize(item.state)}</TableCell>
            <TableCell>
              <Chip variant="flat" color="success" radius="sm" size="sm">
                {item.count}
              </Chip>
            </TableCell>

            <TableCell>
              <Button size="sm" variant="flat">
                Show Vehicles
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};