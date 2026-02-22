import { useCallback, useEffect, useRef, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router";
import ProductTable from "../Tables/productTable";
import { getProductList } from "../../utils/thunkApis/product.api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const fetchProducts = async (cursor = null) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await getProductList(cursor);

      setProducts(prev => {
        const newData = res?.data.filter(
          newItem => !prev.some(prevItem => prevItem._id === newItem._id)
        );

        return [...prev, ...newData];
      });

      setNextCursor(res.nextCursor);

      if (!res.nextCursor) {
        setHasMore(false);
      }

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const lastElementRef = useCallback(node => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // console.log("🔥 API HIT");
        fetchProducts(nextCursor);
      }
    });

    if (node) observer.current.observe(node);

  }, [loading, nextCursor, hasMore]);

  return (
    <>
      <ProductTable
        products={products}
        lastElementRef={lastElementRef}
      />
      {loading && <CircularProgress />}
    </>
  );
};

export default ProductList;
