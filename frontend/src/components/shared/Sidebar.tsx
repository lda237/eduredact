import { Home, FileText, CreditCard, Settings, Users } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="bg-white w-64 p-4 shadow-md hidden lg:block">
      <ul className="space-y-2">
        <li>
          <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <FileText className="w-5 h-5" />
            <span>Orders</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <CreditCard className="w-5 h-5" />
            <span>Payments</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <Users className="w-5 h-5" />
            <span>Users</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};