"use client";

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import { format, secondsToHours } from 'date-fns';
import { ChevronUp, ChevronDown, Clock, MoreHorizontal, RefreshCcw, RefreshCw, Search, Trash, X } from 'lucide-react';
import React, { use, useMemo, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { bulkDeleteTransactions } from '@/actions/accounts';
import { toast } from 'sonner';
import { BarLoader } from 'react-spinners';
//import useFetch from '@/hooks/useFetch'; // adjust path based on where it's located
//import useFetch from "@/hooks/use fetch";
import useFetch from '@/hooks/use fetch';
import{ useEffect } from 'react';

    

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc",
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [recurringFilter, setRecurringFilter] = useState("");

    const { 
        loading: deleteLoading,
        fn: deleteFn,
        data: deleted,
    } = useFetch(bulkDeleteTransactions);

    // const handleBulkDelete = async () => {
    //     if (
    //         !window.confirm(
    //             `Are you sure you want to delete ${selectedIds.length} transactions?`
    //         )
    //     ) {
    //         return;
    //     }
    //     deleteFn(selectedIds);
    // }



    const filteredAndSortedTransactions = useMemo(() => {
        let result = [...transactions];

        //Search Filter Application.
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter((transaction) =>
                transaction.description?.toLowerCase().includes(searchLower)
            );
        }

        //Recurring Filter.
        if (recurringFilter) {
            result = result.filter((transaction) => {
                if (recurringFilter === "recurring") return transaction.isRecurring;
                return !transaction.isRecurring;
            });
        }

        //Apply type filter
        if (typeFilter) {
            result = result.filter((transaction) => transaction.type === typeFilter);
        }

        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0;

            switch (sortConfig.field) {
                case "date":
                    comparison = new Date(a.date) - new Date(b.date);
                    break;
                case "category":
                    comparison = a.category.localeCompare(b.category);
                    break;
                case "amount":
                    comparison = a.amount - b.amount;
                    break;

                default:
                    comparison = 0;
            }
            return sortConfig.direction === "asc" ? comparison : -comparison;
        });

        return result;
    }, [
        transactions,
        searchTerm,
        typeFilter,
        recurringFilter,
        sortConfig,
    ]);

    const handleSort = (field) => {
        setSortConfig(current=>({
            field,
            direction:
                current.field==field && current.direction === "asc" ? "desc" : "asc",
        }))
    };

    const handleSelect = (id) => {
        setSelectedIds((current) => 
            current.includes(id)
                ? current.filter(item=>item!=id)
                : [...current, id]
    );
    };

    const handleSelectAll = (id) => {
        setSelectedIds((current) => 
            current.length === filteredAndSortedTransactions.length
                ? []
                : filteredAndSortedTransactions.map((t) => t.id)
    );
    };

    const handleBulkDelete =() => {
        if (
            !window.confirm(
                `Are you sure you want to delete ${selectedIds.length} transactions?`
            )
        ) {
            return;
        }
        deleteFn(selectedIds);
    }

    useEffect(() => {
        if (deleted && !deleteLoading) {
            toast.error("Transactions Successfully Deleted");
        }
    },[deleted, deleteLoading])

    const handleClearFilters= () => {
        setSearchTerm("");
        setTypeFilter("");
        setRecurringFilter("");
        setSelectedIds([]);
    };


  return (
    <div className='space-y-4'>
        <BarLoader className='mt-4' width={"100%"} color='#9333ea' />
        {/* Filters */}

        <div className='flex flex-col sm:flex-row gap-4'>

            <div className='relative flex-1'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'/>
                <Input
                    placeholder="search a Transaction.."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-8'
                />
            </div>

            <div className='flex gap-2'>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="INCOME">Income</SelectItem>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={recurringFilter}
                onValueChange={(value) => setRecurringFilter(value)}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Transactions" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="recurring">recurring</SelectItem>
                    <SelectItem value="Non-recurring">Non-Recurring</SelectItem>
                </SelectContent>
            </Select> 
            </div>

            {selectedIds.length> 0 && (
                <div className='flex items-center gap-2'>
                    <Button 
                        variant="destructive"
                        size="sm"
                        onClick={handleBulkDelete}
                    >
                        <Trash className='h-4 w-4 mr-2'/>
                        Delete selected Items ({selectedIds.length})
                    </Button>
                </div>)}

                {(searchTerm || typeFilter || recurringFilter) &&(
                    <Button variant="outline" size="icon" onClick={handleClearFilters} title="Clear Filters">
                        <X className='h-4 w-5'/>
                    </Button>
                )}

        </div>

        {/* Transactions */}
        <div className="rounded-md border">

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                onCheckedChange={handleSelectAll}
                                checked={
                                    selectedIds.length === 
                                        filteredAndSortedTransactions.length &&
                                    filteredAndSortedTransactions.length > 0
                                }
                        />
                        </TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("date")}
                        >
                            <div className='flex items-center'>
                                Date{" "}
                                {sortConfig.field==='date' && 
                                (sortConfig.direction==="asc"? (
                                    <ChevronUp className='ml-1 h-4 w-4' />
                                ) : (
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                ))}
                            </div>
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("category")}
                        >
                            <div className='flex items-center'>
                                Category
                                {sortConfig.field==='category' && 
                                    (sortConfig.direction==="asc"? (
                                        <ChevronUp className='ml-1 h-4 w-4' />
                                    ) : (
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                ))}
                            </div>
                        </TableHead>
                        <TableHead 
                            className="cursor-pointer"
                            onClick={() => handleSort("amount")}
                        >
                            <div className='flex items-center justify-end'>
                                Amount
                                {sortConfig.field==='amount' && 
                                    (sortConfig.direction==="asc"? (
                                        <ChevronUp className='ml-1 h-4 w-4' />
                                ) : (
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                ))}
                            </div>
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
                                    {/* {<Checkbox 
                                        onCheckedChange={() => handleSelect(transaction-id)}
                                        checked={selectedIds.includes(transaction.id)}
                                    /> */}
                                    <Checkbox
                                        onCheckedChange={() => handleSelect(transaction.id)}
                                        checked={selectedIds.includes(transaction.id)}
                                    />
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
                                                <div className='text-sm'>
                                                    <div className="font-medium">Next Date:</div>
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

                                <TableCell>


                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel
                                            onClick={() =>
                                                router.push(
                                                    `/transaction/create?edit=${transaction.id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            className="text-destructive"
                                            // onClick={()=>deleteFn([transaction.id])}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

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




//3hrs 24 minutes 18 seconds


// if (recurringFilter) {
//     result = result.filter((transaction) => {
//       if (recurringFilter === "recurring") return transaction.isRecurring;
//       return !transaction.isRecurring;
//     });

