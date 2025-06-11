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
import { Search, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { ViewEmployeeDialog } from './view-employee-dialog';
import { EditEmployeeDialog } from './edit-employee-dialog';
import { DeactivateEmployeeDialog } from './deactivate-employee-dialog';

const initialEmployees = [
  {
    id: 'EMP-001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'IT',
    position: 'Senior Developer',
    hireDate: '2022-03-15',
    phone: '+1 (555) 123-4567',
    assetsCount: 3,
    status: 'Active',
  },
  {
    id: 'EMP-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    hireDate: '2021-08-20',
    phone: '+1 (555) 234-5678',
    assetsCount: 2,
    status: 'Active',
  },
  {
    id: 'EMP-003',
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    department: 'Finance',
    position: 'Financial Analyst',
    hireDate: '2023-01-10',
    phone: '+1 (555) 345-6789',
    assetsCount: 1,
    status: 'Active',
  },
  {
    id: 'EMP-004',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'HR',
    position: 'HR Specialist',
    hireDate: '2022-11-05',
    phone: '+1 (555) 456-7890',
    assetsCount: 2,
    status: 'Active',
  },
  {
    id: 'EMP-005',
    name: 'David Brown',
    email: 'david.brown@company.com',
    department: 'Operations',
    position: 'Operations Manager',
    hireDate: '2020-06-12',
    phone: '+1 (555) 567-8901',
    assetsCount: 4,
    status: 'Active',
  },
];

export function EmployeesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setShowViewDialog(true);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEditDialog(true);
  };

  const handleDeactivateEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setShowDeactivateDialog(true);
  };

  const handleEmployeeUpdated = (updatedEmployee: any) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
  };

  const handleEmployeeDeactivated = (employeeId: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, status: 'Inactive' } : emp
    ));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Employees</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search employees..."
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
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.department}</Badge>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.hireDate}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{employee.assetsCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.status === 'Active' ? 'default' : 'destructive'}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewEmployee(employee)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeactivateEmployee(employee)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Deactivate
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

      <ViewEmployeeDialog
        employee={selectedEmployee}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />

      <EditEmployeeDialog
        employee={selectedEmployee}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onEmployeeUpdated={handleEmployeeUpdated}
      />

      <DeactivateEmployeeDialog
        employee={selectedEmployee}
        open={showDeactivateDialog}
        onOpenChange={setShowDeactivateDialog}
        onEmployeeDeactivated={handleEmployeeDeactivated}
      />
    </>
  );
}