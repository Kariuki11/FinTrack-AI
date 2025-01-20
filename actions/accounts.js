"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };

    if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }

    if (obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }

    return serialized;
};

export async function updateDefaultAccount(accountId) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Not Authorized");

        if (!accountId) {
            throw new Error("Invalid accountId");
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!user) {
            throw new Error("No User Found");
        }

        // Verify the account belongs to the user
        const account = await db.account.findFirst({
            where: {
                id: accountId,
                userId: user.id,
            },
        });

        if (!account) {
            throw new Error("Account not found or unauthorized access");
        }

        // Update all accounts to not default
        await db.account.updateMany({
            where: { userId: user.id, isDefault: true },
            data: { isDefault: false },
        });

        // Set the new default account
        const updatedAccount = await db.account.update({
            where: { id: accountId },
            data: { isDefault: true },
        });

        // Revalidate the dashboard if necessary
        revalidatePath("/dashboard");

        return { success: true, data: serializeTransaction(updatedAccount) };
    } catch (error) {
        console.error("Error in updateDefaultAccount:", error.message);
        return { success: false, error: error.message };
    }
}

export async function getAccountWithTransactions(accountId) {
    const { userId } = await auth();
        if (!userId) throw new Error("Not Authorized");

        if (!accountId) {
            throw new Error("Invalid accountId");
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!user) {
            throw new Error("No User Found");
        }

        const account = await db.account.findUnique({
            where: { id: accountId, userId: user.id },
            include: {
                transactions: {
                    orderBy: {date: "desc"}
                },
                _count: {
                    select: { transactions: true },
                },
            },
        });

        if (!account) return null;

        return {
            ...serializeTransaction(account),
            transactions: account.transactions.map(serializeTransaction)
        }
}

























// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";


// const serializeTransaction = (obj) => {
//     const serialized = { ...obj };

//     if (obj.balance) {
//         serialized.balance = obj.balance.toNumber();
//     }

//     if (obj.amount) {
//         serialized.amount = obj.amount.toNumber();
//     }

//     return serialized;
// };

// export async function updateDefaultAccount(accountId) {
//     try {
//         const { userId } = await auth();
//         if (!userId) throw new Error("Not Authorized");

//         const user = await db.user.findUnique({
//             where: { clerkUserId: userId },
//         });
//         if (!user) {
//             throw new Error ("No User Found")
//         }

//         await db.account.updateMany({
//             where: { userId: user.id, isDefault: true },
//             data: { isDefault: false },
//         });

//         const account = await db.account.update({
//             where: {
//                 id: accountId,
//                 userId: userId,
//             },
//             data: { isDefault: true },
//         })

//         revalidatePath('/dashboard');
//         return { success: true, data: serializeTransaction(account)}
//     } catch (error) {
//         return { success: false, error: error.message };
//     }
// }