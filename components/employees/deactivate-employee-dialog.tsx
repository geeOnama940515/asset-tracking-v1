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

interface DeactivateEmployeeDialogProps {
  employee: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmployeeDeactivated: (employeeId: string) => void;
}

export function DeactivateEmployeeDialog({ 
  employee, 
  open, 
  onOpenChange, 
  onEmployeeDeactivated 
}: DeactivateEmployeeDialogProps) {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDeactivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Deactivating employee:', {
      employeeId: employee.id,
      employeeName: employee.name,
      reason,
      deactivatedAt: new Date().toISOString(),
    });
    
    toast({
      title: 'Employee deactivated',
      description: `${employee.name} has been deactivated successfully.`,
    });

    onEmployeeDeactivated(employee.id);
    setReason('');
    setIsLoading(false);
    onOpenChange(false);
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Deactivate Employee
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to deactivate {employee.name}? This action will:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Remove access to all company systems</li>
              <li>• Unassign all currently assigned assets</li>
              <li>• Mark the employee as inactive in the system</li>
              <li>• Require reactivation to restore access</li>
            </ul>
          </div>

          <form onSubmit={handleDeactivate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Deactivation</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for deactivating this employee..."
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
                {isLoading ? 'Deactivating...' : 'Deactivate Employee'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}