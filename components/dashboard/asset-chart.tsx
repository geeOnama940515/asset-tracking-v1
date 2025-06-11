'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'PC', count: 85 },
  { name: 'Laptop', count: 92 },
  { name: 'Printer', count: 28 },
  { name: 'Server', count: 15 },
  { name: 'Phone', count: 47 },
  { name: 'Others', count: 23 },
];

export function AssetChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}