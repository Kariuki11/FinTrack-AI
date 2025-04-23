"use client";
import React, { useState, useMemo } from 'react';
import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DATE_RANGES = {
  "7D": { label: "last 7 Days", days: 7 },
  "1M": { label: "last Month", days: 30 },
  "3M": { label: "last 3 Months", days: 90 },
  "6M": { label: "last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

const AccountChart = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) =>
        new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), 'yyyy-MM-dd');

      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }

      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, transaction) => ({
        // income: acc.income +Day.income,
        income: acc.income + transaction.income,
        expense: acc.expense + transaction.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);


  return (
    <div>

      <Card>
        <CardHeader className= "flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-base font-bold">Transaction Overview</CardTitle>
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Range" />
              </SelectTrigger>
              <SelectContent>{Object.entries(DATE_RANGES).map(([key, {label}]) => {
                return (
                  <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
                )
              })}
              </SelectContent>
            </Select>

        </CardHeader>
        <CardContent>

          <div className="flex justify-around mb-6 text-sm">
            <div className=" text-center">
              <p className="text-muted-foreground>">Total Income</p>
              <p className="text-lg font-bold text-green-500">
                ${totals.income.toFixed(2)}
              </p>
            </div>

            <div className=" text-center">
              <p className="text-muted-foreground>">Total Expense</p>
              <p className="text-lg font-bold text-red-500"> 
                ${totals.expense.toFixed(2)}
                </p>
            </div>

            <div className=" text-center">
              <p className="text-muted-foreground>">Total Expense</p>
              <p className={`text-lg font-bold ${
                totals.income - totals.expense >= 0
                 ? "text-green-500"
                  : "text-red-500"
              }`}
              > 
                ${(totals.income - totals.expense).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >

                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="date" />
                <YAxis
                  fontSize={13}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}/>
                <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  //activeBar={<Rectangle fill="pink" stroke="blue" />} 
                />
                <Bar
                  dataKey="expense"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  //activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
                {/* <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#4caf50" />
                <Bar dataKey="expense" fill="#f44336" /> */}
              </BarChart>
            </ResponsiveContainer> 
      </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountChart;












// "use client";
// import React, { useState } from 'react'
// import { endOfDay, format, startOfDay, subDays } from 'date-fns';
// import {
//     Bar,
//     BarChart, 
//     CartesianGrid,
//     Legend,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis
// } from 'recharts'

// const DATE_RANGES = {
//     "7D": { label: "last 7 Days", days: 7 },
//     "1M": { label: "last Month", days: 30 },
//     "3M": { label: "last 3 Months", days: 90 },
//     "6M": { label: "last 6 Months", days: 180 },
//     ALL: { label: "All Time", days: null },
// }

// const AccountChat = ({transactions}) => {

//     const [dateRange, setDateRange] = useState("1M");

//     const filteredData = useMemo(() =>{
//         const range = DATE_RANGES[dateRange];
//         const now = new Date();
//         const startDate = range.days 
//             ? startOfDay(subdays(now, range.days)) 
//             : startOfDay(new Date(0));

//         //Filter Transactions with Dates
//         const filtered = transactions.filter(
//             (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
//     );

//     const grouped = filtered.reduce((acc, transaction) => {
//       const date = format(new Date(transaction.date), 'yyyy-MM-dd');

//       if (!acc[date]) {
//         acc[date] = { date, income: 0, expense: 0 };
//       }

//       if (transaction.type === "INCOME") {
//         acc[date].income += transaction.amount;
//       } else {
//         acc[date].expense += transaction.amount;
//       }

//       return acc;
//     }, {});

//     // Convert the grouped object to an array
//     return Object.values(grouped).sort((a, b) => new Date(a.date) -new Date(b.date));

//     },[transactions, dateRange])

//     console.log(filteredData);

//   return (
//     <div>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             width={500}
//             height={300}
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
//             <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />

//             3hrs 33 minutes
//           </BarChart>
//         </ResponsiveContainer>
//     </div>
//   )
// }