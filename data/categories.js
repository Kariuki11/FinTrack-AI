export const defaultCategories = [
  // Income Categories
  {
    id: "salary",
    name: "Salary",
    type: "INCOME",
    color: "#22c55e", // green-500
    icon: "Wallet",
  },
  {
    id: "freelance",
    name: "Freelance",
    type: "INCOME",
    color: "#06b6d4", // cyan-500
    icon: "Laptop",
  },
  {
    id: "investments",
    name: "Investments",
    type: "INCOME",
    color: "#6366f1", // indigo-500
    icon: "TrendingUp",
  },
  {
    id: "business",
    name: "Business",
    type: "INCOME",
    color: "#ec4899", // pink-500
    icon: "Building",
  },
  {
    id: "rental",
    name: "Rental",
    type: "INCOME",
    color: "#f59e0b", // amber-500
    icon: "Home",
  },
  {
    id: "other-income",
    name: "Other Income",
    type: "INCOME",
    color: "#64748b", // slate-500
    icon: "Plus",
  },

  // Expense Categories
  {
    id: "housing",
    name: "Housing",
    type: "EXPENSE",
    color: "#ef4444", // red-500
    icon: "Home",
    subcategories: ["Rent", "Mortgage", "Property Tax", "Maintenance"],
  },
  {
    id: "transportation",
    name: "Transportation",
    type: "EXPENSE",
    color: "#f97316", // orange-500
    icon: "Car",
    subcategories: ["Fuel", "Public Transport", "Maintenance", "Parking"],
  },
  {
    id: "groceries",
    name: "Groceries",
    type: "EXPENSE",
    color: "#84cc16", // lime-500
    icon: "Shopping",
  },
  {
    id: "utilities",
    name: "Utilities",
    type: "EXPENSE",
    color: "#06b6d4", // cyan-500
    icon: "Zap",
    subcategories: ["Electricity", "Water", "Gas", "Internet", "Phone"],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    type: "EXPENSE",
    color: "#8b5cf6", // violet-500
    icon: "Film",
    subcategories: ["Movies", "Games", "Streaming Services"],
  },
  {
    id: "food",
    name: "Food",
    type: "EXPENSE",
    color: "#f43f5e", // rose-500
    icon: "UtensilsCrossed",
  },
  {
    id: "shopping",
    name: "Shopping",
    type: "EXPENSE",
    color: "#ec4899", // pink-500
    icon: "ShoppingBag",
    subcategories: ["Clothing", "Electronics", "Home Goods"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    type: "EXPENSE",
    color: "#14b8a6", // teal-500
    icon: "HeartPulse",
    subcategories: ["Medical", "Dental", "Pharmacy", "Insurance"],
  },
  {
    id: "education",
    name: "Education",
    type: "EXPENSE",
    color: "#6366f1", // indigo-500
    icon: "GraduationCap",
    subcategories: ["Tuition", "Books", "Courses"],
  },
  {
    id: "personal",
    name: "Personal Care",
    type: "EXPENSE",
    color: "#d946ef", // fuchsia-500
    icon: "Smile",
    subcategories: ["Haircut", "Gym", "Beauty"],
  },
  {
    id: "travel",
    name: "Travel",
    type: "EXPENSE",
    color: "#0ea5e9", // sky-500
    icon: "Plane",
  },
  {
    id: "insurance",
    name: "Insurance",
    type: "EXPENSE",
    color: "#64748b", // slate-500
    icon: "Shield",
    subcategories: ["Life", "Home", "Vehicle"],
  },
  {
    id: "gifts",
    name: "Gifts & Donations",
    type: "EXPENSE",
    color: "#f472b6", // pink-400
    icon: "Gift",
  },
  {
    id: "bills",
    name: "Bills & Fees",
    type: "EXPENSE",
    color: "#fb7185", // rose-400
    icon: "Receipt",
    subcategories: ["Bank Fees", "Late Fees", "Service Charges"],
  },
  {
    id: "other-expense",
    name: "Other Expenses",
    type: "EXPENSE",
    color: "#94a3b8", // slate-400
    icon: "MoreHorizontal",
  },
];

export const categoryColors = defaultCategories.reduce((acc, category) => {
  acc[category.id] = category.color;
  return acc;
}, {});
























// export const defaultCategories = [
//   // Income Categories
//   {
//     id: "consulting",
//     name: "Consulting",
//     type: "INCOME",
//     color: "#0ea5e9", // sky-500
//     icon: "Briefcase",
//   },
//   {
//     id: "royalties",
//     name: "Royalties",
//     type: "INCOME",
//     color: "#a855f7", // purple-500
//     icon: "Crown",
//   },
//   {
//     id: "grants",
//     name: "Grants",
//     type: "INCOME",
//     color: "#facc15", // yellow-500
//     icon: "Award",
//   },
//   {
//     id: "stock-trading",
//     name: "Stock Trading",
//     type: "INCOME",
//     color: "#4ade80", // green-400
//     icon: "ChartLine",
//   },
//   {
//     id: "dividends",
//     name: "Dividends",
//     type: "INCOME",
//     color: "#22d3ee", // cyan-400
//     icon: "BarChart",
//   },
//   {
//     id: "side-hustle",
//     name: "Side Hustle",
//     type: "INCOME",
//     color: "#f97316", // orange-500
//     icon: "Hammer",
//   },

//   // Expense Categories
//   {
//     id: "childcare",
//     name: "Childcare",
//     type: "EXPENSE",
//     color: "#e11d48", // red-600
//     icon: "Baby",
//     subcategories: ["Babysitter", "School Supplies", "Activities"],
//   },
//   {
//     id: "pets",
//     name: "Pets",
//     type: "EXPENSE",
//     color: "#22c55e", // green-500
//     icon: "Paw",
//     subcategories: ["Food", "Vet", "Accessories"],
//   },
//   {
//     id: "fitness",
//     name: "Fitness",
//     type: "EXPENSE",
//     color: "#f59e0b", // amber-500
//     icon: "Dumbbell",
//     subcategories: ["Gym Membership", "Equipment", "Classes"],
//   },
//   {
//     id: "subscriptions",
//     name: "Subscriptions",
//     type: "EXPENSE",
//     color: "#3b82f6", // blue-500
//     icon: "Paper",
//     subcategories: ["Streaming", "Magazines", "Apps"],
//   },
//   {
//     id: "social",
//     name: "Social Life",
//     type: "EXPENSE",
//     color: "#f43f5e", // rose-500
//     icon: "Chat",
//     subcategories: ["Parties", "Outings", "Meetups"],
//   },
//   {
//     id: "furniture",
//     name: "Furniture",
//     type: "EXPENSE",
//     color: "#facc15", // yellow-500
//     icon: "Chair",
//   },
//   {
//     id: "maintenance",
//     name: "Home Maintenance",
//     type: "EXPENSE",
//     color: "#a3e635", // lime-400
//     icon: "Tool",
//     subcategories: ["Repairs", "Cleaning", "Appliances"],
//   },
//   {
//     id: "investments-expenses",
//     name: "Investment Expenses",
//     type: "EXPENSE",
//     color: "#16a34a", // green-600
//     icon: "Graph",
//     subcategories: ["Stocks", "Mutual Funds", "Cryptocurrency"],
//   },
//   {
//     id: "festivities",
//     name: "Festivities",
//     type: "EXPENSE",
//     color: "#ec4899", // pink-500
//     icon: "Balloon",
//     subcategories: ["Birthdays", "Weddings", "Anniversaries"],
//   },
//   {
//     id: "gaming",
//     name: "Gaming",
//     type: "EXPENSE",
//     color: "#8b5cf6", // violet-500
//     icon: "Gamepad",
//     subcategories: ["Consoles", "PC Games", "Accessories"],
//   },
//   {
//     id: "charity",
//     name: "Charity",
//     type: "EXPENSE",
//     color: "#4ade80", // green-400
//     icon: "HandHoldingHeart",
//     subcategories: ["Donations", "Fundraisers", "Volunteering"],
//   },
//   {
//     id: "tools",
//     name: "Tools",
//     type: "EXPENSE",
//     color: "#fbbf24", // yellow-400
//     icon: "Wrench",
//     subcategories: ["Work Tools", "DIY Kits", "Repairs"],
//   },
//   {
//     id: "debt",
//     name: "Debt Payments",
//     type: "EXPENSE",
//     color: "#7e22ce", // purple-700
//     icon: "Bank",
//     subcategories: ["Loans", "Credit Cards", "Interest"],
//   },
//   {
//     id: "hobbies",
//     name: "Hobbies",
//     type: "EXPENSE",
//     color: "#fb923c", // orange-400
//     icon: "PaintBrush",
//     subcategories: ["Arts & Crafts", "Photography", "Music"],
//   },
//   {
//     id: "miscellaneous",
//     name: "Miscellaneous",
//     type: "EXPENSE",
//     color: "#64748b", // slate-500
//     icon: "QuestionMarkCircle",
//   },
// ];

// export const categoryColors = defaultCategories.reduce((acc, category) => {
//   acc[category.id] = category.color;
//   return acc;
// }, {});



