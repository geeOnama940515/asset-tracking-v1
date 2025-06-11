'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, QrCode } from 'lucide-react';
import { QRCodeDialog } from './qr-code-dialog';

const assetTypes = ['PC', 'LAPTOP', 'PRINTER', 'SERVER', 'PHONE', 'OTHERS'];

export function AddAssetDialog() {
  const [open, setOpen] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [newAsset, setNewAsset] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    purchaseDate: '',
    warrantyEnd: '',
    purchasePrice: '',
    notes: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate asset ID
    const assetId = `AST-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    const asset = { 
      id: assetId, 
      ...formData,
      status: 'Available',
      assignedTo: null
    };
    
    console.log('New asset:', asset);
    
    toast({
      title: 'Asset added successfully',
      description: `Asset ${assetId} has been added to the system.`,
    });

    // Store the new asset for QR code generation
    setNewAsset(asset);

    setFormData({
      name: '',
      type: '',
      serialNumber: '',
      manufacturer: '',
      model: '',
      purchaseDate: '',
      warrantyEnd: '',
      purchasePrice: '',
      notes: '',
    });
    setOpen(false);
    
    // Show QR code dialog after a brief delay
    setTimeout(() => {
      setShowQRDialog(true);
    }, 500);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Enter the details of the new IT asset to add it to your inventory.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Asset Name *</Label>
                <Input
                  id="name"
                  placeholder="Dell OptiPlex 7090"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Asset Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {assetTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number *</Label>
                <Input
                  id="serialNumber"
                  placeholder="DL123456789"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  placeholder="Dell"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="OptiPlex 7090"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="1299.99"
                  step="0.01"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warrantyEnd">Warranty End Date</Label>
                <Input
                  id="warrantyEnd"
                  type="date"
                  value={formData.warrantyEnd}
                  onChange={(e) => setFormData({ ...formData, warrantyEnd: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this asset..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Asset</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <QRCodeDialog
        asset={newAsset}
        open={showQRDialog}
        onOpenChange={setShowQRDialog}
      />
    </>
  );
}