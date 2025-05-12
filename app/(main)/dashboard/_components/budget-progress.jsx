"use client"

import React, { useState } from 'react'
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
import { Check, X } from 'lucide-react';
  

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(
        initialBudget?.amount?.toString() || ""
    )

    const percentUsed = initialBudget
        ? (currentExpenses / initialBudget.amount) * 100
        : 0;

        const handleUpdateBudget=()=>{}

        const handleCancel=()=>{}

  return (
    <Card>
        <CardHeader>
            <CardTitle>Monthly Budget (Default Account)</CardTitle>
            <div>
                {isEditing ? (
                    <div>
                        <Input
                            type="number"
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                            className="w-28"
                            placeholder="Enter new budget"
                            autofocus
                        />
                        <Button variant="ghost" size="icon" onClick ={handleUpdateBudget}>
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
                    </>
                )}
            </div>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
    </Card>

  )
}

export default BudgetProgress