import { SearchFilter } from '../../shared';

export const OrderManagement = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Management</h2>
      <SearchFilter placeholder="Search orders..." />
      {/* Add order list here */}
    </div>
  );
};