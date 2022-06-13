import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Product } from "./Product";
import { filterByName } from "../../models/shop";

export const List = () => {
  const { totalCount } = useSelector((rootState) => rootState.shop);
  const query = useSelector((rootState) => rootState.shop.query);

  const products = useSelector((rootState) =>
    query ? filterByName(rootState, query) : rootState.shop.products
  );
  const dispatch = useDispatch();
  const hasNextPage = totalCount > products.length;
  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: () => dispatch.shop.getProducts(),
  });
  useEffect(() => {
    dispatch.shop.getProducts();
  }, []);
  return (
    <div className="bg-gray-100 p-3 pt-20">
      <div
        role="list"
        className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8 2xl:gap-5 3xl:gap-5"
      >
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
        {hasNextPage && !query && <div ref={infiniteRef}>Loading…</div>}
      </div>
    </div>
  );
};
