import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/subscriptions": "Subscriptions",
  "/investments": "Investments",
};

function Header() {
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] ?? "Finance Tracker";

  return (
    <header className="relative flex h-18 items-center bg-stone-100 px-6">
      <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-extralight tracking-wide text-stone-900">
        {pageTitle}
      </h1>

      <div className="ml-auto flex items-center p-2 gap-3">
        <span className="text-sm font-extralight text-stone-600">
          Welcome User
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-200">
          U
        </div>
      </div>
    </header>
  );
}

export default Header;
