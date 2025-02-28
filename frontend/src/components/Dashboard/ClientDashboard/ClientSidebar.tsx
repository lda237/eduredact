
const ClientSidebar = () => {
  return (
    <aside className="client-sidebar">
      <ul>
        <li><a href="/client/orders">Mes Commandes</a></li>
        <li><a href="/client/payments">Paiements</a></li>
        <li><a href="/client/notifications">Notifications</a></li>
      </ul>
    </aside>
  );
};

export default ClientSidebar;