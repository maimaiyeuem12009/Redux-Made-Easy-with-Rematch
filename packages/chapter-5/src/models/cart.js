export const cart = {
  state: {
    addedIds: [],
    quantityById: {},
  },

  reducers: {
    ADD_TO_CART(state, product) {
      const indexProduct = state.addedIds.indexOf(product.id);
      if (indexProduct === -1) {
        return {
          addedIds: [...state.addedIds, product.id],
          quantityById: {
            ...state.quantityById,
            [product.id]: 1,
          },
        };
      }
      return {
        addedIds: state.addedIds,
        quantityById: {
          ...state.quantityById,
          [product.id]: (state.quantityById[product.id] || 0) + 1,
        },
      };
    },
    REMOVE_FROM_CART(state, product) {
      const indexProduct = state.addedIds.indexOf(product.id);
      if (indexProduct === -1) return state;
      const clonedIds = [...state.addedIds];

      const clonedQuantityById = state.quantityById;

      if (clonedQuantityById[product.id] === 1) {
        clonedIds.splice(indexProduct, 1);

        delete clonedQuantityById[product.id];
      } else {
        clonedQuantityById[product.id] -= 1;
      }

      return {
        addedIds: clonedIds,
        quantityById: clonedQuantityById,
      };
    },
    RESTORE_CART() {
      return {
        addedIds: [],
        quantityById: {},
      };
    },
  },

  effects: {},
};

export const getProduct = (state, id) =>
  state.shop.products.find((product) => product.id === id);

export const getQuantity = (state, id) => state.cart.quantityById[id];
