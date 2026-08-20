import type {
    Simulation,
    SimulationDetailResponse,
    CreateSimulationPayload,
    CreateSimulationResponse,
} from "@/types/simulation";

export async function getSimulations(): Promise<{ simulations: Simulation[] }> {
    const resp = await fetch(`/api/simulations`);
    if (!resp.ok) {
        throw new Error("Failed to fetch simulations");
    }
    return resp.json();
}

export async function getSimulationById(
    id: string
): Promise<SimulationDetailResponse> {
    const resp = await fetch(`/api/simulations/${id}`);
    if (!resp.ok) {
        throw new Error("Failed to fetch simulation");
    }
    return resp.json();
}

export async function calculateSimulation(
    payload: CreateSimulationPayload
): Promise<CreateSimulationResponse> {
    const resp = await fetch("/api/simulations/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const respData = await resp.json();

    if (!resp.ok) {
        throw new Error(
            respData.message || respData.error || "Gagal membuat simulasi"
        );
    }

    return respData;
}

export async function updateSimulation(
    id: string,
    payload: Partial<CreateSimulationPayload>
): Promise<CreateSimulationResponse> {
    const resp = await fetch(`/api/simulations/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const respData = await resp.json();

    if (!resp.ok) {
        throw new Error(
            respData.message || respData.error || "Gagal memperbarui simulasi"
        );
    }

    return respData;
}

export async function deleteSimulation(
    id: string
): Promise<{ message: string; simulation: Simulation }> {
    const resp = await fetch(`/api/simulations/${id}`, {
        method: "DELETE",
    });

    const respData = await resp.json();

    if (!resp.ok) {
        throw new Error(
            respData.message || respData.error || "Gagal menghapus simulasi"
        );
    }

    return respData;
}