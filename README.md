
#  Expense Tracker – Personal Finance Manager

A modern **Expense Tracker web application** that helps users manage their **income and expenses**, view real-time balance updates, and analyze spending patterns through an **advanced expense breakdown chart**.
This project focuses on **JavaScript logic, DOM manipulation, state handling, and local storage persistence**, along with a clean and advanced UI.

---

##  Key Features

### Core Functionality

* Add **Income** and **Expense** transactions
* Real-time **Balance Calculation** (Income − Expenses)
* Dynamic **Transaction History**
* Delete transactions instantly
* Data persistence using **Local Storage**

###  Smart Form Behavior

* Transaction description adapts correctly:

  * Example:

    * *Income → Salary*
    * *Expense → Groceries*
* Amount accepts only valid numeric values
* Prevents empty or zero-value transactions
* Displays validation warnings for incorrect input

###  Currency Support

* Uses **Indian Rupee (₹)** 
* Currency updated consistently across:

  * Balance
  * Income & Expense summaries
  * Transaction list
  * Expense breakdown chart

---

##  Advanced Expense Breakdown

* Interactive **Donut Chart** for expense visualization
* Category-wise breakdown
* Percentage contribution of each expense
* Visual progress bars for better insights
* Exact ₹ amount displayed per category

---

##  User Interface

* Clean and modern **advanced UI**
* Summary cards for:

  * Total Balance
  * Total Income
  * Total Expenses
* Smooth animations and hover effects
* Responsive layout for better usability

---

##  Project Structure

```
expense-tracker/
│
├── components/
│   ├── SummaryCards.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── ExpenseChart.tsx
│
├── constants.ts
├── types.ts
├── App.tsx
├── index.html
├── style.css
├── script.js
├── package.json
└── README.md
```

##  How It Works

* Transactions are stored in **Local Storage**
* App loads saved transactions on startup
* Balance updates automatically on add/delete
* Expense chart recalculates dynamically
* UI updates instantly using component-based rendering

