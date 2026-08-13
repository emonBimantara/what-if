
import { simulationSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        simulationSchema.parse(body);
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({
                error: "Validation failed",
                details: error.issues,
            }, { status: 400 })
        }
        return Response.json({
            message: "Invalid Age",
        }, { status: 400 })
    }

    return Response.json({
        message: "Hello from backend",
        receivedData: body,
    })
}