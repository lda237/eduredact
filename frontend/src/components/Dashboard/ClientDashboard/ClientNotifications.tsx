import { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  id: number;
  message: string;
}

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios.get('/api/client/notifications', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setNotifications(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="client-notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientNotifications;