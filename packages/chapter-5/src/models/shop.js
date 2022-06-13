import { root } from "postcss";
import ApiClient from "../lib/axios/apiClient";

const api = new ApiClient();

export const shop = {
  state: {
    products: [],
    currentPage: 1,
    totalCount: 0,
  },

  reducers: {
    SET_PRODUCTS(state, { products, totalCount }) {
      return {
        products: [...state.products, ...products],
        currentPage: state.currentPage + 1,
        totalCount,
      };
    },
    SET_QUERY(state, query) {
      return {
        ...state,
        query,
      };
    },
    SET_FAVORITE(state, { indexToModify, product }) {
      const products = [...state.products];
      products[indexToModify] = product;
      return {
        ...state,
        products,
      };
    },
  },

  effects: (dispatch) => ({
    // eslint-disable-next-line no-shadow
    async getProducts(_, { shop }) {
      const { currentPage } = shop;

      const { data, headers } = await api.get("/products", {
        _page: currentPage,
        _limit: 10,
      });
      const totalCount = parseInt(headers["x-total-count"], 10);
      dispatch.shop.SET_PRODUCTS({ products: data, totalCount });
    },
    async setToFavorite({ id }, rootState) {
      const productIndex = rootState.shop.products.findIndex(
        (el) => el.id === id
      );
      if (productIndex === -1) return;
      const product = rootState.shop.products[productIndex];
      const { data } = await api.patch(`/products/${id}`, {
        favorite: !product.favorite,
      });
      this.SET_FAVORITE({ indexToModify: productIndex, product: data });
    },
  }),
};

export const filterByName = (rootState, query) =>
  rootState.shop.products.filter((product) =>
    product.productName.toLowerCase().includes(query.toLowerCase())
  );
