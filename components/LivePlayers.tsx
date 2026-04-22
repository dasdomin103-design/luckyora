'use client';

import { useEffect, useState } from 'react';

export default function LivePlayers() {
  const [online, setOnline] = useState(0);

  useEffect(() => {
    const ping = () => fetch('/api/ping', { method: 'POST' });

    const fetchStats = async () => {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setOnline(data.online);
    };

    ping();
    fetchStats();

    const interval = setInterval(() => {
      ping();
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-center mt-10'>
      <h3 className='text-4xl font-bold text-green-400'>{online}</h3>
      <p className='text-gray-400'>Players Online</p>
    </div>
  );
}
