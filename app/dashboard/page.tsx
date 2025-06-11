'use client';

import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentAssets } from '@/components/dashboard/recent-assets';
import { AssetChart } from '@/components/dashboard/asset-chart';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your IT assets and recent activities</p>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetChart />
        <RecentAssets />
      </div>
    </div>
  );
}