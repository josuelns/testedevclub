import {create} from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
}));