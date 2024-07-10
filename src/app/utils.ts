import { Employee } from "./types";

export function toCamelCase(str: string) {
    return str
        .toLowerCase()
        .split(/[^a-zA-Z0-9]+/)
        .map((word, index) => {
            if (index === 0) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
}

export function calculateTotalSalary(item: Employee) {
    return (
      Number(item.basicSalary) +
      Number(item.salaryAllowances) +
      Number(item.additions) -
      Number(item.deductions)
    );
};