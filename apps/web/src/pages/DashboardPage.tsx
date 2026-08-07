import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import DashboardActions from "../components/dashboard/DashboardActions";
import ExpenseTable from "../components/dashboard/ExpenseTable";
import MonthlyExpenseChart from "../components/dashboard/MonthlyExpenseChart";

function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardActions />

      <ExpenseTable />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MonthlyExpenseChart />
        <CategoryPieChart />
      </div>
    </div>
  );
}

export default DashboardPage;
