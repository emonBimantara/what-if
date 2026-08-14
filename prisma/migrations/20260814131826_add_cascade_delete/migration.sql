-- DropForeignKey
ALTER TABLE "Scenario" DROP CONSTRAINT "Scenario_simulationId_fkey";

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "Simulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
