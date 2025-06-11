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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const mockEmployees = [
  { id: 'EMP-001', name: 'John Smith', department: 'IT' },
  { id: 'EMP-002', name: 'Sarah Johnson', department: 'Marketing' },
  { id: 'EMP-003', name: 'Mike Wilson', department: 'Finance' },
  { id: 'EMP-004', name: 'Emily Davis', department: 'HR' },
  { id: 'EMP-005', name: 'David Brown', department: 'Operations' },
];

interface AssignAssetDialogProps {
  asset: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignAssetDialog({ asset, open, onOpenChange }: AssignAssetDialogProps) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employee = mockEmployees.find(emp => emp.id === selectedEmployee);
    
    console.log('Asset assignment:', {
      assetId: asset?.id,
      employeeId: selectedEmployee,
      employeeName: employee?.name,
      notes,
      assignedAt: new Date().toISOString(),
    });
    
    toast({
      title: 'Asset assigned successfully',
      description: `${asset?.name} has been assigned to ${employee?.name}.`,
    });

    setSelectedEmployee('');
    setNotes('');
    onOpenChange(false);
  };

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Asset</DialogTitle>
          <DialogDescription>
            Assign {asset.name} ({asset.id}) to an employee.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee">Select Employee *</Label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an employee" />
              </SelectTrigger>
              <SelectContent>
                {mockEmployees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name} - {employee.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Assignment Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this assignment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedEmployee}>
              Assign Asset
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}