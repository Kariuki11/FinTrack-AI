
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "./prisma";

// export const checkUser = async () => {
//     try {
//         const user = await currentUser();

//         if (!user) {
//             console.error("currentUser is null or undefined.");
//             return null;
//         }cd 

//         const emailAddress = user.emailAddresses?.[0]?.emailAddress;

//         if (!emailAddress) {
//             console.error("No email address found for the user.");
//             return null;
//         }

//         // Check if the user exists in the database
//         const loggedInUser = await db.user.findUnique({
//             where: {
//                 clerkUserId: user.id,
//             },
//         });

//         if (loggedInUser) {
//             return loggedInUser;
//         }

//         // Create a new user if not found
//         const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

//         const newUser = await db.user.create({
//             data: {
//                 clerkUserId: user.id,
//                 name,
//                 imageUrl: user.imageUrl,
//                 email: emailAddress,
//             },
//         });

//         return newUser;
//     } catch (error) {
//         console.error("Error in checkUser:", error);
//         return null;
//     }
// };
































// import { currentUser } from "@clerk/nextjs/server"
// import { db } from "./prisma";

// export const checkUser = async()=>{
//     const user = await currentUser();

//     if (!user) {
//         return null;
//     }

//     try {
//         const loggedInUser = await db.user.findUnique({
//             where: {
//                 clerkUserId: user.id,
//             },
//         });

//         if (loggedInUser) {
//             return loggedInUser;
//         }

//         const name = `${user.firstName} ${user.lastName}`;

//         const newUser = await db.user.create({
//             data:{
//                 clerkUserId: user.id,
//                 name,
//                 imageUrl: user.imageUrl,
//                 email: user.emailAddresses[0].emailAddress,
//             },
//         });

//         return newUser;
//     } catch (error) {
//         console.log(error.message);
//     }
// }