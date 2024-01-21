'use client';
import React, { FC } from 'react';
import { CarAnnualSummaryDto } from '@/api-types';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
  Label,
} from 'recharts';
import { formatNumber, minifyNumber } from '@/utils';

interface AnnualSummaryChartProps {
  data: CarAnnualSummaryDto[];
}

export const AnnualSummaryChart: FC<AnnualSummaryChartProps> = ({ data }) => {
  // Your component logic goes here

  return (
    <>
      <div className="h-40"></div>
      <div className="h-96">
        <ResponsiveContainer width="80%" height="100%">
          <LineChart
            width={500}
            height={900}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              style={{ fontSize: 12, userSelect: 'none' }}
              tickMargin={10}
              tickLine={false}
            />
            <YAxis
              tickMargin={6}
              style={{ fontSize: 12, userSelect: 'none' }}
              tickCount={10}
              domain={[0, Math.max(...data.map((item) => item.total))]}
              tickFormatter={(value) => minifyNumber(value, false, true)}
              tickLine={false}
              label={{
                value: 'Annual Value (USD)',
                angle: -90,
                position: 'insideTopRight',
                offset: 70,
              }}
            />
            <Tooltip
              formatter={(value) => formatNumber(value as number)}
              contentStyle={{
                fontSize: 13,
                textTransform: 'capitalize',
              }}
            />
            <Legend
              wrapperStyle={{
                textTransform: 'capitalize',
                fontWeight: 700,
                padding: 10,
              }}
              iconSize={16}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
