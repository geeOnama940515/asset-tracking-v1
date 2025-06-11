'use client';

import { EmployeesTable } from '@/components/employees/employees-table';
import { AddEmployeeDialog } from '@/components/employees/add-employee-dialog';

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-2">Manage employee records and asset assignments</p>
        </div>
        <AddEmployeeDialog />
      </div>
      
      <EmployeesTable />
    </div>
  );
}