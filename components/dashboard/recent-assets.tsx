'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Laptop, Printer, Server, Smartphone } from 'lucide-react';

const recentAssets = [
  {
    id: 'AST-001',
    name: 'Dell OptiPlex 7090',
    type: 'PC',
    assignedTo: 'John Smith',
    status: 'Active',
    icon: Monitor,
  },
  {
    id: 'AST-002',
    name: 'MacBook Pro 16"',
    type: 'LAPTOP',
    assignedTo: 'Sarah Johnson',
    status: 'Active',
    icon: Laptop,
  },
  {
    id: 'AST-003',
    name: 'HP LaserJet Pro',
    type: 'PRINTER',
    assignedTo: 'Office Floor 2',
    status: 'Available',
    icon: Printer,
  },
  {
    id: 'AST-004',
    name: 'Dell PowerEdge R740',
    type: 'SERVER',
    assignedTo: 'Data Center',
    status: 'Active',
    icon: Server,
  },
  {
    id: 'AST-005',
    name: 'iPhone 14 Pro',
    type: 'PHONE',
    assignedTo: 'Mike Wilson',
    status: 'Active',
    icon: Smartphone,
  },
];

export function RecentAssets() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAssets.map((asset) => {
            const Icon = asset.icon;
            return (
              <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{asset.name}</p>
                    <p className="text-sm text-gray-500">{asset.id} • {asset.assignedTo}</p>
                  </div>
                </div>
                <Badge variant={asset.status === 'Active' ? 'default' : 'secondary'}>
                  {asset.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}