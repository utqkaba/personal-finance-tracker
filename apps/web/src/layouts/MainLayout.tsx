import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 bg-stone-200 p-6 border-t-4 border-l-4 border-double border-stone-300 rounded-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
