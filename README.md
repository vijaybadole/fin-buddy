# Fin Buddy - Personal Finance Decision Platform 💰

A production-ready Next.js web application that helps users make informed financial decisions through comprehensive calculators and visualizations.

## 🎯 Features

### 1. **Buy vs Rent Analysis** 🏠

- Compare buying and renting scenarios with detailed financial projections
- Input property price, down payment, loan terms, rent, appreciation rates, and investment returns
- Monthly simulation with EMI calculations
- Visual comparison of property value vs investment growth
- Net worth comparison and recommendations

### 2. **SIP Calculator** 📈

- Calculate Systematic Investment Plan returns
- Track investment growth over time with monthly breakdowns
- Inflation-adjusted value calculations
- Visual area charts showing invested amount vs returns
- Returns percentage calculation

### 3. **Goal-Based Investment Planner** 🎯

- Plan investments to achieve specific financial goals
- Calculate required monthly SIP to reach target amounts
- Current savings growth projection
- Feasibility assessment with progress tracking
- Detailed investment breakdown

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with dark mode support
- **State Management**: Zustand with persistence
- **Charts**: Recharts for interactive visualizations
- **Form Validation**: React Hook Form + Zod
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── buy-vs-rent/         # Buy vs Rent page
│   ├── sip-calculator/      # SIP Calculator page
│   ├── goal-planner/        # Goal Planner page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/               # React components
│   ├── ui/                  # UI components (Button, Card, Input, etc.)
│   ├── charts/              # Chart components (Recharts)
│   ├── forms/               # Form components with validation
│   └── index.ts             # Components barrel export
├── lib/                      # Utility functions
│   └── finance/             # Financial calculations
│       ├── emi.ts           # EMI calculations
│       ├── sip.ts           # SIP calculations
│       ├── buyVsRent.ts     # Buy vs Rent logic
│       ├── goalPlanner.ts   # Goal planner logic
│       └── index.ts         # Exports
├── store/                    # Zustand state management
│   └── useFinanceStore.ts   # Main store with persistence
├── types/                    # TypeScript types
│   └── finance.ts           # Financial data types
└── tsconfig.json            # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd fin-buddy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🧮 Financial Calculations

All calculations use monthly compounding and are implemented in pure functions:

### EMI Calculation

```
EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
```

Where:

- P = Principal (Loan Amount)
- r = Monthly interest rate (Annual / 12 / 100)
- n = Number of months

### SIP Future Value

```
FV = P * [((1 + r)^n - 1) / r] * (1 + r)
```

Where:

- P = Monthly investment
- r = Monthly return rate (Annual / 12 / 100)
- n = Number of months

### Goal-Based Investment

Calculates required monthly SIP based on:

- Current savings and their growth
- Goal amount and timeline
- Expected return rate
- Inflation adjustments

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Live Charts**: Real-time visualizations with Recharts
- **Form Validation**: Zod schema validation with helpful error messages
- **Local Persistence**: All calculations saved to browser localStorage
- **Accessibility**: Semantic HTML and ARIA attributes

## 🌍 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your repository
   - Click "Deploy"

The application will be automatically built and deployed.

### Deploy on Other Platforms

The application is production-ready for any Node.js hosting:

- Heroku
- AWS
- Google Cloud
- DigitalOcean
- Azure
- Any Docker-compatible platform

```bash
# Build
npm run build

# Start
npm start
```

## 🔒 Type Safety

All code uses TypeScript in strict mode:

- Full type coverage for financial calculations
- Type-safe Zustand store
- Validated form inputs with Zod
- No `any` types

## 📊 Performance Optimizations

- **React Server Components** (where applicable)
- **Dynamic imports** for charts
- **Optimized re-renders** with Zustand
- **CSS-in-JS** via Tailwind for small bundle size
- **Image optimization** with Next.js
- **Code splitting** for faster page loads

## 🧪 Testing the Application

1. **Buy vs Rent Analysis**
   - Enter property price, down payment, loan details
   - Provide rent and appreciation assumptions
   - See property value vs investment comparison
   - Get recommendation based on net worth projection

2. **SIP Calculator**
   - Input monthly investment, return rate, and duration
   - View wealth accumulation over time
   - Check inflation-adjusted values
   - Understand return percentage

3. **Goal Planner**
   - Set a financial goal and timeline
   - Enter current savings and expected returns
   - Calculate required monthly investment
   - Check feasibility and progress tracking

## 🎓 Key Insights

### Buy vs Rent

- Compares total net worth in both scenarios
- Accounts for property appreciation and rent increases
- Considers investment returns if renting
- Shows EMI and rent trend over time

### SIP

- Demonstrates power of compound interest
- Shows inflation impact on purchasing power
- Calculates effective return percentage
- Tracks invested vs returns breakdown

### Goal Planning

- Identifies gap between current and goal amount
- Calculates required monthly commitment
- Breaks down growth from savings vs investments
- Provides clear feasibility assessment

## 🐛 Troubleshooting

### Port 3000 already in use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Dependencies not installing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles not loading

```bash
# Rebuild Tailwind CSS
npm run build
```

## 📝 License

MIT - Open source and free to use

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📧 Support

For issues or questions, create an issue in the repository.

---

**Made with ❤️ for smarter financial decisions**
