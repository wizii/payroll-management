import { sql, QueryResultRow } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';
import type { SalaryLog } from "@/app/types";

export async function GET() {
    const { rows } = await sql`SELECT * From salarylog`;
    return Response.json({ salaryLog: deserializeLog(rows) })
  }

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

function deserializeLog(rows: QueryResultRow[]) {
    return rows.map(row => ({
        sessionId: row.sessionid,
        staffId: row.staffid,
        totalSalary: row.totalsalary,
        salaryDate: row.salarydate,
        paymentDate: row.paymentdate
    }));
}