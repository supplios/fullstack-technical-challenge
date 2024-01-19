import { carsApi } from "@/api";
import { MyTable } from "@/app/challenge-2/table";

interface SearchParams {
  ids: number[];
  page?: number;
  perPage?: number;
}

async function getResult(searchParams: SearchParams) {
  try {
    const res = await carsApi.findCarsByIds(
      searchParams.ids,
      Number(searchParams.perPage) || undefined,
      Number(searchParams.page) || 1
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);

    throw new Error("Failed to fetch data");
  }
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { page, perPage, ids } = searchParams;
  console.log(ids);

  const carPaginatedResult = await getResult({
    ids,
    perPage,
    page,
  });

  return (
    <MyTable
      filterOptions={{ colors: [], brands: [], prices: [] }}
      cars={carPaginatedResult}
    />
  );
};

export default Page;
