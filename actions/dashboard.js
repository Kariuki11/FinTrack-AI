"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };

    if (obj.balance !== null && obj.balance !== undefined) {
        serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount !== null && obj.amount !== undefined) {
        serialized.amount = obj.amount.toNumber();
    }
    return serialized;
};

export async function createAccount(data) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("User is not authorized. Please log in.");
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error("User not found in the database.");
        }

        if (data.balance === null || data.balance === undefined) {
            throw new Error("Balance is required");
        }
        const balanceFloat = parseFloat(data.balance);
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid balance amount");
        }

        const existingAccounts = await db.account.findMany({
            where: { userId: user.id },
        });

        const shouldBeDefault =
            existingAccounts.length === 0 || data.isDefault;

        if (shouldBeDefault) {
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false },
            });
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            },
        });

        const serializedAccount = serializeTransaction(account);

        revalidatePath("/dashboard");
        return { success: true, data: serializedAccount };
    } catch (error) {
        console.error("Error in createAccount:", error);
        throw new Error(error.message || "An error occurred while creating the account");
    }
}

export async function getUserAccounts() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User is not authorized. Please log in.");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found in the database.");
    }

    const accounts = await db.account.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: {
                    transactions: true, // Ensure this matches your Prisma schema
                },
            },
        },
    });

    const serializedAccount = accounts.map(serializeTransaction);

    return serializedAccount;
}






















// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";

// const serializeTransaction = (obj) => {
//     const serialized = { ...obj };

//     if (obj.balance !== null && obj.balance !== undefined) {
//         serialized.balance = obj.balance.toNumber();
//     }
//     if (obj.amount !== null && obj.amount !== undefined) {
//         serialized.amount = obj.amount.toNumber();
//     }
//     return serialized;
// };

// export async function createAccount(data) {
//     try {
//         const { userId } = await auth();
//         if (!userId) {
//             throw new Error("User is not authorized. Please log in.");
//         }

//         const user = await db.user.findUnique({
//             where: { clerkUserId: userId },
//         });

//         if (!user) {
//             throw new Error("User not found in the database.");
//         }

//         if (data.balance === null || data.balance === undefined) {
//             throw new Error("Balance is required");
//         }
//         const balanceFloat = parseFloat(data.balance);
//         if (isNaN(balanceFloat)) {
//             throw new Error("Invalid balance amount");
//         }

//         // Check if this is the first user account
//         const existingAccounts = await db.account.findMany({
//             where: { userId: user.id },
//         });

//         const shouldBeDefault =
//             existingAccounts.length === 0 || Boolean(data.isDefault);

//         // If account is default, unset other default accounts
//         if (shouldBeDefault) {
//             await db.account.updateMany({
//                 where: { userId: user.id, isDefault: true },
//                 data: { isDefault: false },
//             });
//         }

//         const account = await db.account.create({
//             data: {
//                 ...data,
//                 balance: balanceFloat,
//                 userId: user.id,
//                 isDefault: shouldBeDefault,
//             },
//         });

//         const serializedAccount = serializeTransaction(account);

//         revalidatePath("/dashboard");
//         return { success: true, data: serializedAccount };
//     } catch (error) {
//         console.error("Error in createAccount:", error);
//         throw new Error("An error occurred while creating the account");
//     }
// }

// export async function getUserAccounts() {
//     const { userId } = await auth();
//         if (!userId) {
//             throw new Error("User is not authorized. Please log in.");
//         }

//         const user = await db.user.findUnique({
//             where: { clerkUserId: userId },
//         });

//         if (!user) {
//             throw new Error("User not found in the database.");
//         }

//         const accounts = await db.account.findMany({
//             where: { userId: user.id },
//             orderBy: { createdAt: "desc" },
//             include:{
//                 _count:{
//                     select:{
//                         transaction: true,
//                     },
//                 },
//             },
//         });
//         const serializedAccount = accounts.map(serializeTransaction);

//         return serializedAccount;
// }






































// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// const serializeTransaction = (obj)=>{
//     const serialized = { ...obj };

//     if (obj.balance) {
//         serialized.balance = obj.balance.toNumber();
//     }
//     if (obj.amount) {
//         serialized.amount = obj.amount.toNumbser();
//     }
//     return serialized;
// };

// export async function createAccount(data) {
//     try {
//         const { userId } = await auth();
//         if (!userId) throw new Error("Unauthorized");

//         const user = await db.user.findUnique({
//             where: { clerkUserId: userId },
//         });

//         if (!user) {
//             throw new Error("User not found");
//         }

//         // Convert Balance to float before saving
//         const balanceFloat = parseFloat(data.balance);
//         if (isNaN(balanceFloat)) {
//             throw new Error("Invalid balance Amount");
//         }

//         //Check if this is the first user account
//         const existingAccounts = await db.account.findMany({
//             where: { userId: user.id }
//         });

//         const shouldBeDefault = 
//             existingAccounts.length === 0 ? true : data.isDefault;

//         // If account is default, unset other default accounts.
//         if (shouldBeDefault) {
//             await db.account.updateMany({
//                 where: { userId: user.id, isDefault: true },
//                 data: { isDefault: false },
//             });
//         }

//         const account = await db.account.create({
//             data: {
//                 ...data,
//                 balance: balanceFloat,
//                 userId: user.id,
//                 idDefalut: shouldBeDefault,
//             },
//         });

//         const serializedAccount = serializeTransaction(account)

//         revalidatePath("/dashboard");
//         return { success: true, data: serializedAccount };
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }