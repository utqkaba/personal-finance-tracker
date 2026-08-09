import { ChartNoAxesColumn, HandCoins, Landmark, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: ChartNoAxesColumn,
  },
  {
    label: "Subscriptions",
    path: "/subscriptions",
    icon: HandCoins,
  },
  {
    label: "Investments",
    path: "/investments",
    icon: Landmark,
  },
  {
    label: "Log Out",
    path: "/",
    icon: LogOut,
  },
];

function Sidebar() {
  return (
    <aside className="flex h-full shrink-0 w-64 flex-col border-none bg-stone-100">
      <div className="flex h-18 justify-center items-center px-6 py-6">
        <h1 className="italic text-xl text-stone-900 text-shadow-stone-300 text-shadow-lg">
          Finance Tracker
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-3 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-extralight transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-stone-100 to-stone-300 text-blue-800"
                    : "text-stone-600 hover:bg-linear-to-r from-stone-100 to-stone-300 hover:text-stone-900"
                }`
              }
            >
              <Icon size={18} strokeWidth={1.8} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
