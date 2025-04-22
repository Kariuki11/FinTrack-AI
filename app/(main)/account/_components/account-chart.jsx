"use client";
import React, { useState, useMemo } from 'react';
import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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
        income: acc.income +Day.income,
        expense: acc.expense + transaction.expense,
      })
    )
  })


  return (
    <div>
      {/* 
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4caf50" />
          <Bar dataKey="expense" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer> 
      */}
      <p>Chart is currently commented out.</p>
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