import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard({ user }) {
  const [overview, setOverview] = useState({});
  const [activity, setActivity] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get('/admin/stats/overview').then(res => setOverview(res.data));
    axios.get('/admin/stats/activity').then(res => setActivity(res.data));
    axios.get('/admin/stats/users-by-role').then(res => setRoles(res.data));
  }, []);

  const COLORS = ['#007bff', '#28a745', '#ffc107', '#dc3545'];

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Admin Analytics Dashboard</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-white p-4 shadow rounded'><p>Users</p><h3 className='text-xl'>{overview.users}</h3></div>
        <div className='bg-white p-4 shadow rounded'><p>Cases</p><h3 className='text-xl'>{overview.cases}</h3></div>
        <div className='bg-white p-4 shadow rounded'><p>Evidence</p><h3 className='text-xl'>{overview.evidence}</h3></div>
        <div className='bg-white p-4 shadow rounded'><p>Messages</p><h3 className='text-xl'>{overview.messages}</h3></div>
      </div>

      <div className='bg-white p-4 shadow rounded'>
        <h3 className='text-lg font-bold mb-2'>Monthly Activity</h3>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={activity}>
            <XAxis dataKey='month' /><YAxis />
            <Tooltip /><Legend />
            <Line type='monotone' dataKey='cases' stroke='#007bff' name='Cases' />
            <Line type='monotone' dataKey='evidence' stroke='#28a745' name='Evidence' />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-white p-4 shadow rounded'>
        <h3 className='text-lg font-bold mb-2'>Users by Role</h3>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie data={roles} dataKey='count' nameKey='role' cx='50%' cy='50%' outerRadius={100}>
              {roles.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
