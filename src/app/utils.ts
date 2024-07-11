import { Employee } from "./types";

export function calculateTotalSalary(item: Employee) {
    return (
      Number(item.basicSalary) +
      Number(item.salaryAllowances) +
      Number(item.additions) -
      Number(item.deductions)
    );
};