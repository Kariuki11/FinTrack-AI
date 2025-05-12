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
                        <Button variant="ghost" size="icon">
                            <Check/>
                        </Button >
                        <Button variant="ghost" size="icon">
                            <X/>
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
    </Card>

  )
}

export default BudgetProgress