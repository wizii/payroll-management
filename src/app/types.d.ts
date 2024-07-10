export type Employee = {
    staffId: number;
    name: string;
    joiningDate: date;
    basicSalary: number;
    salaryAllowances: number;
    additions: number;
    deductions: number;
}

export type SalaryLog = {
    staffId: number;
    totalSalary: string;
    salaryDate: string;
};