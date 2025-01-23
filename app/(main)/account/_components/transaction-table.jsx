"use client";

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import { format } from 'date-fns';
import { Clock, RefreshCcw, RefreshCw } from 'lucide-react';
import React from 'react'

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {

    const filteredAndSortedTransactions = transactions;

    const handleSort = () => {};

  return (
    <div className='space-y-4'>
        {/* Filters */}

        {/* Transactions */}
        <div className="rounded-md border">

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox/>
                        </TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("date")}
                        >
                            <div className='flex items-center'>Date</div>
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("category")}
                        >
                            <div className='flex items-center'>Category</div>
                        </TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("amount")}
                        >
                            <div className='flex items-center justify-end'>Amount</div>
                        </TableHead>
                        <TableHead>Recurring</TableHead>
                        <TableHead className="w-[50px]" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedTransactions.length === 0?(
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                No Transactionts found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredAndSortedTransactions.map((transaction)=>(
                            <TableRow key={transaction.id}>
                                <TableCell >
                                    <Checkbox/>
                                </TableCell>
                                <TableCell>
                                    {format(new Date(transaction.date), "PP")}
                                </TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell className="capitalize">
                                    <span
                                        style={{
                                            background: categoryColors[transaction.category],
                                        }}
                                        className='px-2 py-1 rounded text-white text-sm'
                                    >
                                        {transaction.category}
                                    </span>
                                    </TableCell>
                                <TableCell 
                                    className="text-right font-bold"
                                    style={{
                                        color: transaction.type === "EXPENSE" ? "red" : "green"
                                    }}
                                >
                                    {transaction.type==='EXPENSE' ? '-' : '+'}
                                    ${transaction.amount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    {transaction.isRecurring?(
                                        <TooltipProvider>
                                            <Tooltip>
                                            <TooltipTrigger>
                                                <Badge variant="outline" className="gap-1">
                                                    <RefreshCw className="gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200"/>
                                                    {RECURRING_INTERVALS[transaction.RECURRING_INTERVALS
                                                    ]
                                                    }
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <div>
                                                    <div>Next Date:</div>
                                                    <div>
                                                    {format(new Date(transaction.nextRecurringDate), "PP")}
                                                    </div>
                                                </div>
                                            </TooltipContent>
                                            </Tooltip>
                                      </TooltipProvider>
                                    ) : (
                                        <Badge variant="outline" className="gap-1">
                                            <Clock className="h-2 w-2"/>
                                            One-time
                                        </Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>

    </div>
  )
}

export default TransactionTable;



//2 hrs 53 minutes 53 seconds