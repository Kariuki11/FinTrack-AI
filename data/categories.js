export const defaultCategories = [
  // Income Categories
  {
    id: "consulting",
    name: "Consulting",
    type: "INCOME",
    color: "#0ea5e9", // sky-500
    icon: "Briefcase",
  },
  {
    id: "royalties",
    name: "Royalties",
    type: "INCOME",
    color: "#a855f7", // purple-500
    icon: "Crown",
  },
  {
    id: "grants",
    name: "Grants",
    type: "INCOME",
    color: "#facc15", // yellow-500
    icon: "Award",
  },
  {
    id: "stock-trading",
    name: "Stock Trading",
    type: "INCOME",
    color: "#4ade80", // green-400
    icon: "ChartLine",
  },
  {
    id: "dividends",
    name: "Dividends",
    type: "INCOME",
    color: "#22d3ee", // cyan-400
    icon: "BarChart",
  },
  {
    id: "side-hustle",
    name: "Side Hustle",
    type: "INCOME",
    color: "#f97316", // orange-500
    icon: "Hammer",
  },

  // Expense Categories
  {
    id: "childcare",
    name: "Childcare",
    type: "EXPENSE",
    color: "#e11d48", // red-600
    icon: "Baby",
    subcategories: ["Babysitter", "School Supplies", "Activities"],
  },
  {
    id: "pets",
    name: "Pets",
    type: "EXPENSE",
    color: "#22c55e", // green-500
    icon: "Paw",
    subcategories: ["Food", "Vet", "Accessories"],
  },
  {
    id: "fitness",
    name: "Fitness",
    type: "EXPENSE",
    color: "#f59e0b", // amber-500
    icon: "Dumbbell",
    subcategories: ["Gym Membership", "Equipment", "Classes"],
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    type: "EXPENSE",
    color: "#3b82f6", // blue-500
    icon: "Paper",
    subcategories: ["Streaming", "Magazines", "Apps"],
  },
  {
    id: "social",
    name: "Social Life",
    type: "EXPENSE",
    color: "#f43f5e", // rose-500
    icon: "Chat",
    subcategories: ["Parties", "Outings", "Meetups"],
  },
  {
    id: "furniture",
    name: "Furniture",
    type: "EXPENSE",
    color: "#facc15", // yellow-500
    icon: "Chair",
  },
  {
    id: "maintenance",
    name: "Home Maintenance",
    type: "EXPENSE",
    color: "#a3e635", // lime-400
    icon: "Tool",
    subcategories: ["Repairs", "Cleaning", "Appliances"],
  },
  {
    id: "investments-expenses",
    name: "Investment Expenses",
    type: "EXPENSE",
    color: "#16a34a", // green-600
    icon: "Graph",
    subcategories: ["Stocks", "Mutual Funds", "Cryptocurrency"],
  },
  {
    id: "festivities",
    name: "Festivities",
    type: "EXPENSE",
    color: "#ec4899", // pink-500
    icon: "Balloon",
    subcategories: ["Birthdays", "Weddings", "Anniversaries"],
  },
  {
    id: "gaming",
    name: "Gaming",
    type: "EXPENSE",
    color: "#8b5cf6", // violet-500
    icon: "Gamepad",
    subcategories: ["Consoles", "PC Games", "Accessories"],
  },
  {
    id: "charity",
    name: "Charity",
    type: "EXPENSE",
    color: "#4ade80", // green-400
    icon: "HandHoldingHeart",
    subcategories: ["Donations", "Fundraisers", "Volunteering"],
  },
  {
    id: "tools",
    name: "Tools",
    type: "EXPENSE",
    color: "#fbbf24", // yellow-400
    icon: "Wrench",
    subcategories: ["Work Tools", "DIY Kits", "Repairs"],
  },
  {
    id: "debt",
    name: "Debt Payments",
    type: "EXPENSE",
    color: "#7e22ce", // purple-700
    icon: "Bank",
    subcategories: ["Loans", "Credit Cards", "Interest"],
  },
  {
    id: "hobbies",
    name: "Hobbies",
    type: "EXPENSE",
    color: "#fb923c", // orange-400
    icon: "PaintBrush",
    subcategories: ["Arts & Crafts", "Photography", "Music"],
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    type: "EXPENSE",
    color: "#64748b", // slate-500
    icon: "QuestionMarkCircle",
  },
];

export const categoryColors = defaultCategories.reduce((acc, category) => {
  acc[category.id] = category.color;
  return acc;
}, {});



