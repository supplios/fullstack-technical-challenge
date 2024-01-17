"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
];

export const SelectComponent = () => {
  return (
    <Select
      label="Brand:"
      labelPlacement="outside"
      placeholder="Select a brand"
      className="max-w-xs"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
};
