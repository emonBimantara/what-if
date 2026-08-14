import { NotFoundError } from "@/lib/errors";

export function handleApiError(error: unknown) {
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