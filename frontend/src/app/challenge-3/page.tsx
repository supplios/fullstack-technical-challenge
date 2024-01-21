import { carsApi } from '@/api';
import { AnnualSummaryChart } from './annual-report-chart';

interface SearchParams {
  model?: string;
  mileageMin?: number;
  mileageMax?: number;
}

async function getResult(searchParams: SearchParams) {
  try {
    const res = await carsApi.getSummedValueByYear(
      searchParams.model,
      searchParams.mileageMin,
      searchParams.mileageMax,
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);

    throw new Error('Failed to fetch data');
  }
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const result = await getResult(searchParams);

  return <AnnualSummaryChart data={result} />;
};

export default Page;
