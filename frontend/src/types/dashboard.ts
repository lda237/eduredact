// Common Types
export type OrderStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';
export type ProjectStatus = 'draft' | 'in-progress' | 'review' | 'completed';

// Client Dashboard Types
export interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalSpent: number;
}

export interface RecentActivity {
  date: Date;
  action: string;
  status: 'pending' | 'completed' | 'in-progress';
}

export interface Order {
  id: string;
  title: string;
  deadline: Date;
  status: OrderStatus;
  price: number;
  writer?: Writer;
}

// Writer Dashboard Types
export interface WriterStats {
  completedProjects: number;
  activeProjects: number;
  earnings: number;
  rating: number;
}

export interface Writer {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  requirements: string[];
  deadline: Date;
  status: ProjectStatus;
  clientFeedback?: string;
}

// Admin Dashboard Types
export interface AdminMetrics {
  totalUsers: number;
  activeWriters: number;
  pendingOrders: number;
  revenue: number;
}

export interface WriterProfile extends Writer {
  status: 'active' | 'pending' | 'suspended';
}

export interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
}