'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const stats = [
  {
    title: 'Total Assets',
    value: '247',
    icon: Monitor,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Assigned Assets',
    value: '189',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Available Assets',
    value: '58',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    title: 'Total Employees',
    value: '156',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}