import { sql } from "@vercel/postgres";

export async function PUT(
    request: Request,
    { params }: { params: { slug: string } }
  ) {
    try {
        const slug = params.slug;
        const { additions, deductions } = await request.json();
        await sql`INSERT INTO SalaryInfo (staffid, additions, deductions)
            VALUES (${slug}, ${additions}, ${deductions})
            ON CONFLICT (staffid) 
            DO UPDATE SET 
                additions = EXCLUDED.additions,
                deductions = EXCLUDED.deductions
        `;
        return new Response(JSON.stringify({ message: 'Employee salary info updated successfully' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (error) {
        console.error('Error updating salary info:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
  }