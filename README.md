# ExpenseGenie

ExpenseGenie is an AI-powered financial management platform designed to help users take control of their spending habits. This application empowers users to track their expenses, plan budgets, and gain valuable insights through personalized AI-driven recommendations. With an intuitive interface and advanced features, ExpenseGenie simplifies the way you manage your finances.

---

## Features

### **AI-Powered Financial Insights**
- Get personalized spending recommendations based on your habits.
- AI-powered suggestions for cost-saving opportunities.

### **Expense Tracking**
- Log your daily expenses seamlessly.
- View categorized expense reports for better understanding.

### **Budget Planning**
- Set monthly budgets and track your progress.
- Receive alerts when nearing budget limits.

### **Secure Dashboard**
- Access a user-friendly and secure dashboard for all your financial activities.
- Manage your data with full control and privacy.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Next.js
- **Backend:** Node.js, Prisma ORM, PostgreSQL
- **Authentication:** Clerk.js for secure and easy login/signup.
- **AI Integration:** OpenAI for generating insights and predictions.

---

## Installation and Setup

### **Step 1: Clone the Repository**

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/Kariuki11/my-app.git
cd my-app
```

### **Step 2: Install Dependencies**

Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### **Step 3: Set Up Environment Variables**

Create a `.env` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
DATABASE_URL=your-database-url
OPENAI_API_KEY=your-openai-api-key
```
Replace the placeholders (`your-clerk-publishable-key`, `your-database-url`, etc.) with your actual credentials.

### **Step 4: Push Prisma Schema**

Push the Prisma schema to your database:

```bash
npx prisma db push
```

### **Step 5: Start the Development Server**

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

---

## Usage

1. **Sign Up/Login**: Use Clerk.js authentication to access the dashboard.
2. **Add Expenses**: Log your daily expenses and categorize them.
3. **Track Progress**: View your spending insights and AI recommendations.
4. **Plan Budget**: Set and adjust budgets as per your goals.

---

## Deployment

To deploy the application, follow the platform-specific instructions:

### **Vercel**

1. Login to [Vercel](https://vercel.com/).
2. Import the GitHub repository.
3. Add the environment variables in the Vercel dashboard.
4. Deploy the project with a single click.

---

## Contributing

We welcome contributions! If you'd like to improve the project, follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your message here"
   ```

4. Push the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Contact

For any inquiries or issues, feel free to reach out:

- **Developer**: Kariuki Kenneth
- **GitHub**: [Kariuki11](https://github.com/Kariuki11)

---

Transform your finances today with ExpenseGenie—your AI-powered financial guide!

