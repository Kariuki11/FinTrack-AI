"use client"

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Pencil, X } from 'lucide-react';
import { toast } from 'sonner';
import useFetch from '@/hooks/use fetch';
import { updateBudget } from "@/actions/budget";

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(
        initialBudget?.amount?.toString() || ""
    )

    const percentUsed = initialBudget
        ? (currentExpenses / initialBudget.amount) * 100
        : 0;

        const {
            loading: isLoading,
            fn: updateBudgetFn,
            data: updatedBudget,
            error,
        } = useFetch(updateBudget);
        

        const handleUpdateBudget=async ()=>{
            const amount= parseFloat(newBudget);

            if (isNaN(amount) || amount <= 0) {
                toast.error("Please enter a valid budget amount.");
                return;
            }

            await updateBudgetFn(amount);
        };

        useEffect(() => {
            if (updatedBudget?.success) {
                setIsEditing(false);
                toast.success("Budget updated successfully!");
            }
        }, [updatedBudget]);

        useEffect(() => {
            if (error) {
                toast.error(error.message || "Failed to update budget. Please try again.");
            }
        }, [error]);

        const handleCancel=()=>{
            setNewBudget(initialBudget?.amount?.toString() || "");
            setIsEditing(false);
        }

  return (
    <Card>
        <CardHeader className="flex dlex-row items-center justify-between space-y-1 pb-2">
            <div className='flex-1'>
            <CardTitle>Monthly Budget (Default Account)</CardTitle>
                <div className='flex items-center gap-2 mt-1'>
                    {isEditing ? (
                        <div className='flex items-center gap-2'>
                            <Input
                                type="number"
                                value={newBudget}
                                onChange={(e) => setNewBudget(e.target.value)}
                                className="w-28"
                                placeholder="Enter new budget"
                                autoFocus
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick ={handleUpdateBudget}
                            >
                                <Check className='h-4 w-4 text-green-700'/>
                            </Button >
                            <Button variant="ghost" size="icon" onClick={handleCancel}>
                                <X className='h-4 w-4 text-red-700'/>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <CardDescription>
                                {initialBudget
                                    ? `$${currentExpenses.toFixed(
                                        2
                                    )} of $${initialBudget.amount.toFixed(2)} spent`
                                    : "No budget set"}
                            </CardDescription>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsEditing(true)}
                                className="h-6 w-6"
                            >
                                <Pencil className="h-4 w-4 text-blue-700" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
    </Card>

  )
}

export default BudgetProgress

//3hrs 57 minutes

