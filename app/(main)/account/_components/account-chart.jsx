"use client";
import React, { useState } from 'react'
import {
    Bar,
    BarChart, 
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

const DATE_RANGES = {
    "7D": { label: "last 7 Days", days: 7 },
    "1M": { label: "last Month", days: 30 },
    "3M": { label: "last 3 Months", days: 90 },
    "6M": { label: "last 6 Months", days: 180 },
    ALL: { label: "All Time", days: null },
}

const AccountChat = ({transactions}) => {

    const [dateRange, setDateRange] = useState("1M");

    const filteredData = useMemo(() =>{
        const range = DATE_RANGES[dateRange];
        const now = new Date();
        const startDate = range.days 
            ? startOfDay(subdays(now, range.days)) 
            : startOfDay(new Date(0));

        //Filter Transactions with Dates
        const filtered = transactions.filter(
            (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    },[transactions, dateRange])

  return (
    <div>
        {/* <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />

          3hrs 33 minutes
        </BarChart>