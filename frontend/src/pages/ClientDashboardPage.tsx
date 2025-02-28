import ClientNavbar from '../components/Dashboard/ClientDashboard/ClientNavbar';
import ClientSidebar from '../components/Dashboard/ClientDashboard/ClientSidebar';
import NewOrderForm from '../components/Dashboard/ClientDashboard/NewOrderForm';
import OrderList from '../components/Dashboard/ClientDashboard/OrderList';
import PaymentHistory from '../components/Dashboard/ClientDashboard/PaymentHistory';
import ClientNotifications from '../components/Dashboard/ClientDashboard/ClientNotifications';

const ClientDashboardPage = () => {
  return (
    <div className="client-dashboard">
      <ClientNavbar />
      <div className="dashboard-content">
        <ClientSidebar />
        <main>
          <NewOrderForm />
          <OrderList />
          <PaymentHistory />
          <ClientNotifications />
        </main>
      </div>
    </div>
  );
};

export default ClientDashboardPage;