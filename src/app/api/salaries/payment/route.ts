import { QueryResultRow, sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';
import type { SalaryLog } from "@/app/types";

// export async function GET() {
//     const { rows } = await sql`SELECT e.staffid, e.name, e.basicsalary, e.salaryallowances, e.joiningdate,
//         COALESCE(s.additions, 0) AS additions, COALESCE(s.deductions, 0) AS deductions FROM employee e LEFT JOIN salaryinfo s
//         ON e.staffid = s.staffid;`;
//     const serializedEmployees = serializeEmployees(rows);
//     return Response.json({ employees: serializedEmployees })
//   }

export async function POST(request: Request) {
    try {
        const sessionId = uuidv4();
        const requestBody: SalaryLog[] = await request.json();

        if (requestBody.length === 0) {
            return new Response(JSON.stringify({ message: 'No data to insert' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400
            });
        }

        const values = requestBody.map(({ staffId, totalSalary, salaryDate }) => [
            sessionId, staffId, totalSalary, salaryDate
        ]);

        const query = `
            INSERT INTO salarylog (sessionid, staffid, totalsalary, salarydate) 
            VALUES ${values.map((_, i) => `($${i*4+1}, $${i*4+2}, $${i*4+3}, $${i*4+4})`).join(',')}
        `;

        const flattenedValues = values.flat();

        await sql.query(query, flattenedValues);
        
        return new Response(JSON.stringify({ message: 'Salary payment added successfully' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (error) {
        console.error('Error adding salary payment:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}