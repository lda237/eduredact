import { Menu, Bell, User } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">EduRedact</h1>
      </div>
      <div className="flex items-center gap-4">
        <button>
          <Bell className="w-6 h-6" />
        </button>
        <button>
          <User className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};