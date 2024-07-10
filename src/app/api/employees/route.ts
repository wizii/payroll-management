import { QueryResultRow, sql } from '@vercel/postgres';
import moment from 'moment';

export async function GET() {
    const { rows } = await sql`SELECT e.staffid, e.name, e.basicsalary, e.salaryallowances, e.joiningdate,
        COALESCE(s.additions, 0) AS additions, COALESCE(s.deductions, 0) AS deductions FROM employee e LEFT JOIN salaryinfo s
        ON e.staffid = s.staffid;`;
    const serializedEmployees = deserializeEmployees(rows);
    return Response.json({ employees: serializedEmployees })
  }

export async function POST(request: Request) {
    try {
        const {name, joiningDate, basicSalary, salaryAllowances } = await request.json();
        await sql`
        INSERT INTO Employee (name, joiningdate, basicsalary, salaryallowances)
        VALUES (${name}, ${joiningDate}, ${basicSalary}, ${salaryAllowances})
        `;
        
        return new Response(JSON.stringify({ message: 'Employee added successfully' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (error) {
        console.error('Error adding employee:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}

function deserializeEmployees(rows: QueryResultRow[]) {
    return rows.map(row => ({
        staffId: row.staffid,
        name: row.name,
        joiningDate: moment(row.joiningdate).format("DD/MM/YYYY"),
        basicSalary: row.basicsalary,
        salaryAllowances: row.salaryallowances,
        additions: row.additions,
        deductions: row.deductions
    }));
}