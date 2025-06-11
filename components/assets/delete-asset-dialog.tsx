'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

interface DeleteAssetDialogProps {
  asset: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssetDeleted: (assetId: string) => void;
}

export function DeleteAssetDialog({ 
  asset, 
  open, 
  onOpenChange, 
  onAssetDeleted 
}: DeleteAssetDialogProps) {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Deleting asset:', {
      assetId: asset.id,
      assetName: asset.name,
      reason,
      deletedAt: new Date().toISOString(),
    });
    
    toast({
      title: 'Asset deleted',
      description: `${asset.name} has been permanently deleted from the system.`,
    });

    onAssetDeleted(asset.id);
    setReason('');
    setIsLoading(false);
    onOpenChange(false);
  };

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Asset
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete {asset.name}? This action will:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Permanently remove the asset from the system</li>
              <li>• Remove all assignment history</li>
              <li>• Cannot be undone once confirmed</li>
              <li>• Asset ID {asset.id} will no longer be valid</li>
            </ul>
          </div>

          <form onSubmit={handleDelete} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Deletion</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for deleting this asset (e.g., damaged beyond repair, stolen, disposed of)..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="destructive"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete Asset'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}