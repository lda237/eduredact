
const ClientNavbar = () => {
  return (
    <nav className="client-navbar">
      <div className="logo">Client Dashboard</div>
      <div className="nav-links">
        <a href="/client/orders">Mes Commandes</a>
        <a href="/client/payments">Paiements</a>
        <a href="/client/notifications">Notifications</a>
      </div>
    </nav>
  );
};

export default ClientNavbar;