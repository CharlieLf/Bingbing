import { canisterId, idlFactory, backend } from "@/declarations/backend";
import { createReactor } from "@ic-reactor/react"

type Backend = typeof backend

export const { useActorStore: useBackendStore, useQueryCall: useBackendQuery } = createReactor<Backend>({
  canisterId,
  idlFactory,
  host: "http://localhost:4943",
})