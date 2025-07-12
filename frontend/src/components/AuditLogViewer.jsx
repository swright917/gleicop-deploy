import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AuditLogViewer({ user }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const endpoint = user.role === 'admin' ? '/logs/' : `/logs/user/${user.id}`;
    axios.get(endpoint)
      .then(res => setLogs(res.data))
      .catch(() => setLogs([]));
  }, [user]);

  return (
    <div>
      <h2 className='text-xl font-bold mb-2'>Audit Logs</h2>
      <table className='table-auto w-full text-sm'>
        <thead>
          <tr>
            <th>User ID</th><th>Action</th><th>Resource</th><th>IP</th><th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} className='border-b'>
              <td>{log.user_id}</td>
              <td>{log.action}</td>
              <td>{log.resource_type}:{log.resource_id}</td>
              <td>{log.ip_address}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
