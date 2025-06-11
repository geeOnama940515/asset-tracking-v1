'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

const assetTypes = ['PC', 'LAPTOP', 'PRINTER', 'SERVER', 'PHONE', 'OTHERS'];

interface EditAssetDialogProps {
  asset: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssetUpdated: (updatedAsset: any) => void;
}

export function EditAssetDialog({ asset, open, onOpenChange, onAssetUpdated }: EditAssetDialogProps) {
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

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || '',
        type: asset.type || '',
        serialNumber: asset.serialNumber || '',
        manufacturer: asset.manufacturer || '',
        model: asset.model || '',
        purchaseDate: asset.purchaseDate || '',
        warrantyEnd: asset.warrantyEnd || '',
        purchasePrice: asset.purchasePrice || '',
        notes: asset.notes || '',
      });
    }
  }, [asset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedAsset = {
      ...asset,
      ...formData,
    };
    
    console.log('Updated asset:', updatedAsset);
    
    toast({
      title: 'Asset updated successfully',
      description: `${updatedAsset.name} has been updated.`,
    });

    onAssetUpdated(updatedAsset);
    onOpenChange(false);
  };

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
          <DialogDescription>
            Update the information for {asset.name} ({asset.id})
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Asset</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}