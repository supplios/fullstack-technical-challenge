import React from "react";

import { MyTable } from "./table";

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export default function App() {
  // const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
  //   new Set(INITIAL_VISIBLE_COLUMNS)
  // );

  const pages = 10;

  // const hasSearchFilter = Boolean(filterValue);

  // const headerColumns = React.useMemo(() => {
  //   if (visibleColumns === "all") return columns;

  //   return columns.filter((column) =>
  //     Array.from(visibleColumns).includes(column.uid)
  //   );
  // }, [visibleColumns]);

  return <MyTable />;
}
