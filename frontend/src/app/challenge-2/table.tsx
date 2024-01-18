"use client";
import React, { FC, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
} from "@nextui-org/react";
import { CarFiltersOptionsDto, CarsDto } from "@/api-types";
import { CarFilters } from "./car-filters";
import { capitalize } from "@/utils";

interface MyTableProps {
  filterOptions: CarFiltersOptionsDto;
  cars: CarsDto[];
}

export const MyTable: FC<MyTableProps> = ({ filterOptions, cars }) => {
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-3 items-end">
          <CarFilters label="brand" items={filterOptions.brands} />
          <CarFilters label="price" items={filterOptions.prices} />
          <CarFilters label="color" items={filterOptions.colors} />
        </div>
        <div className="flex flex-wrap -mb-4 -mx-2">
          <span className="text-default-400 text-small">Total 30 users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              // onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterOptions.brands, filterOptions.colors, filterOptions.prices]);

  return (
    <Table
      isStriped
      aria-label="Example static collection table"
      topContent={topContent}
    >
      <TableHeader>
        <TableColumn>Brand</TableColumn>
        <TableColumn>Model</TableColumn>
        <TableColumn>Year</TableColumn>
        <TableColumn>Color</TableColumn>
        <TableColumn>Mileage</TableColumn>
        <TableColumn>Country</TableColumn>
        <TableColumn>State</TableColumn>
      </TableHeader>
      <TableBody>
        {cars.map(
          ({ id, brand, model, year, color, mileage, country, state }) => (
            <TableRow key={id}>
              <TableCell>{capitalize(brand)}</TableCell>
              <TableCell>{capitalize(model)}</TableCell>
              <TableCell>{year}</TableCell>
              <TableCell>{capitalize(color)}</TableCell>
              <TableCell>{mileage}</TableCell>
              <TableCell>{country}</TableCell>
              <TableCell>{capitalize(state)}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
