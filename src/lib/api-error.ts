import { NotFoundError } from "@/lib/errors";
import { ZodError } from "zod";

export function handleApiError(error: unknown) {
    if (error instanceof ZodError) {
        return Response.json(
            {
                error: "Validation failed",
                details: error.issues,
            },
            { status: 400 }
        );
    }
    
    if (error instanceof NotFoundError) {
        return Response.json(
            { error: error.message },
            { status: 404 }
        );
    }

    return Response.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
}