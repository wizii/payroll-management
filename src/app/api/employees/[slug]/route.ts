import { sql } from "@vercel/postgres";

export async function PUT(
    request: Request,
    { params }: { params: { slug: string } }
  ) {
    try {
        const slug = params.slug;
        const { name, joiningDate, basicSalary, salaryAllowances } = await request.json();
        await sql`
            UPDATE Employee 
            SET name = ${name} , joiningdate = ${joiningDate}, basicsalary = ${basicSalary}, salaryallowances = ${salaryAllowances}
            WHERE staffid = ${slug}
        `;
        return new Response(JSON.stringify({ message: 'Employee updated successfully' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
  }