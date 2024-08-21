import { canisterId, idlFactory, product } from "@/declarations/product";
import { createReactor } from "@ic-reactor/react"

type Product = typeof product

export const {
  useUpdateCall: useProductUpdate,
  useQueryCall: useProductQuery
} = createReactor<Product>({
  canisterId,
  idlFactory,
  host: "http://localhost:4943",
})