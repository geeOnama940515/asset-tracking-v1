'use client';

import { AssetsTable } from '@/components/assets/assets-table';
import { AddAssetDialog } from '@/components/assets/add-asset-dialog';

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assets</h1>
          <p className="text-gray-600 mt-2">Manage all your IT equipment and devices</p>
        </div>
        <AddAssetDialog />
      </div>
      
      <AssetsTable />
    </div>
  );
}