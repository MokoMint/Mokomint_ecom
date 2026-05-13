"use client";
import { useDispatch } from "react-redux";
import { ProductData } from "../types/types";
import { toast } from "react-toastify";
import { addToCart } from "../store/slices/cartSlice";

interface AddToCartButtonProps {
  product: ProductData;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        description: product.description,
        images: product.images,
        price: product.price,
        oldPrice: product.oldPrice,
        stockStatus: product.stockStatus,
        amazonUrl: product.amazonUrl,
        detailsUrl: product.detailsUrl,
        modelNumber: product.modelNumber,
        fullDescription: "",
        information: "",
        sizes: [],
        colors: [],
        reviewCount: 0,
        category: "",
        ageRange: "",
        whatIsInTheBox: "",
      }),
    );
    toast.success("Product added to cart!");
  };
  return (
    <button
      onClick={handleAddToCart}
      type="button"
      className="btn btn-warning btn-lg text-white flex-fill"
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;
