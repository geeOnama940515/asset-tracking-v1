'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Edit, Trash2, UserPlus, QrCode } from 'lucide-react';
import { AssignAssetDialog } from './assign-asset-dialog';
import { EditAssetDialog } from './edit-asset-dialog';
import { DeleteAssetDialog } from './delete-asset-dialog';
import { QRCodeDialog } from './qr-code-dialog';

const initialAssets = [
  {
    id: 'AST-001',
    name: 'Dell OptiPlex 7090',
    type: 'PC',
    serialNumber: 'DL123456789',
    manufacturer: 'Dell',
    model: 'OptiPlex 7090',
    assignedTo: 'John Smith',
    status: 'Active',
    purchaseDate: '2023-01-15',
    warrantyEnd: '2026-01-15',
    purchasePrice: '1299.99',
    notes: 'Primary workstation for development team',
  },
  {
    id: 'AST-002',
    name: 'MacBook Pro 16"',
    type: 'LAPTOP',
    serialNumber: 'MP987654321',
    manufacturer: 'Apple',
    model: 'MacBook Pro 16"',
    assignedTo: 'Sarah Johnson',
    status: 'Active',
    purchaseDate: '2023-03-20',
    warrantyEnd: '2026-03-20',
    purchasePrice: '2499.99',
    notes: 'Design team laptop with enhanced graphics',
  },
  {
    id: 'AST-003',
    name: 'HP LaserJet Pro',
    type: 'PRINTER',
    serialNumber: 'HP555666777',
    manufacturer: 'HP',
    model: 'LaserJet Pro M404n',
    assignedTo: null,
    status: 'Available',
    purchaseDate: '2023-02-10',
    warrantyEnd: '2025-02-10',
    purchasePrice: '199.99',
    notes: 'Office printer for general use',
  },
  {
    id: 'AST-004',
    name: 'Dell PowerEdge R740',
    type: 'SERVER',
    serialNumber: 'PE111222333',
    manufacturer: 'Dell',
    model: 'PowerEdge R740',
    assignedTo: 'Data Center',
    status: 'Active',
    purchaseDate: '2022-12-05',
    warrantyEnd: '2025-12-05',
    purchasePrice: '4999.99',
    notes: 'Main application server',
  },
  {
    id: 'AST-005',
    name: 'iPhone 14 Pro',
    type: 'PHONE',
    serialNumber: 'IP444555666',
    manufacturer: 'Apple',
    model: 'iPhone 14 Pro',
    assignedTo: 'Mike Wilson',
    status: 'Active',
    purchaseDate: '2023-04-12',
    warrantyEnd: '2024-04-12',
    purchasePrice: '999.99',
    notes: 'Company phone for sales team',
  },
];

export function AssetsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignAsset = (asset: any) => {
    setSelectedAsset(asset);
    setShowAssignDialog(true);
  };

  const handleEditAsset = (asset: any) => {
    setSelectedAsset(asset);
    setShowEditDialog(true);
  };

  const handleDeleteAsset = (asset: any) => {
    setSelectedAsset(asset);
    setShowDeleteDialog(true);
  };

  const handleShowQRCode = (asset: any) => {
    setSelectedAsset(asset);
    setShowQRDialog(true);
  };

  const handleAssetUpdated = (updatedAsset: any) => {
    setAssets(assets.map(asset => 
      asset.id === updatedAsset.id ? updatedAsset : asset
    ));
  };

  const handleAssetDeleted = (assetId: string) => {
    setAssets(assets.filter(asset => asset.id !== assetId));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Assets</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.id}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{asset.type}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{asset.serialNumber}</TableCell>
                  <TableCell>{asset.assignedTo || 'Unassigned'}</TableCell>
                  <TableCell>
                    <Badge variant={asset.status === 'Active' ? 'default' : 'secondary'}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{asset.purchaseDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleShowQRCode(asset)}>
                          <QrCode className="mr-2 h-4 w-4" />
                          QR Code
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditAsset(asset)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignAsset(asset)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteAsset(asset)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AssignAssetDialog
        asset={selectedAsset}
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
      />

      <EditAssetDialog
        asset={selectedAsset}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onAssetUpdated={handleAssetUpdated}
      />

      <DeleteAssetDialog
        asset={selectedAsset}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onAssetDeleted={handleAssetDeleted}
      />

      <QRCodeDialog
        asset={selectedAsset}
        open={showQRDialog}
        onOpenChange={setShowQRDialog}
      />
    </>
  );
}