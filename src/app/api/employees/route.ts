import { QueryResultRow, sql } from "@vercel/postgres";
// TODO: Add try/catch
export async function GET() {
    const { rows } = await sql`SELECT * FROM Employee;`;
    const serializedEmployees = serializeEmployees(rows);
    return Response.json({ employees: serializedEmployees })
  }

export async function POST(request: Request) {
    try {
        const { staffId, name, joiningDate, basicSalary, salaryAllowances } = await request.json();
        
        await sql`
        INSERT INTO Employee (staffid, name, joiningdate, basicsalary, salaryallowances)
        VALUES (${staffId}, ${name}, ${joiningDate}, ${basicSalary}, ${salaryAllowances})
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

function serializeEmployees(rows: QueryResultRow[]) {
    return rows.map(row => ({
        staffId: row.staffid,
        name: row.name,
        joiningDate: row.joiningdate,
        basicSalary: row.basicsalary,
        salaryAllowances: row.salaryallowances
    }));
}