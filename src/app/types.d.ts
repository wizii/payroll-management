export type Employee = {
    staffId: number;
    name: string;
    joiningDate: Date;
    basicSalary: number;
    salaryAllowances: number;
    additions: number;
    deductions: number;
}

export type SalaryLogInput = {
    staffId: number;
    totalSalary: string;
    salaryDate: string;
};

export type SalaryLog = {
    sessionId: string;
    staffId: number;
    totalSalary: string;
    salaryDate: string;
    paymentDate: Date;
};

export type SessionInfo = {
    sessionId: string;
    totalSalary: number;
    paymentDate: Date;
};