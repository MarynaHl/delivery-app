import { useDispatch } from "react-redux";
import { ADD_PRODUCT_TO_CART, SELECT_VENDOR } from "../constants/actionTypes";

export default function MenuItem({ info }) {
  const dispatch = useDispatch();
  const { title, price, description, image, category, id } = info;

  function handleAddToCart() {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      product: { productId: id, quantity: 1, image, title, price },
    });
    dispatch({
      type: SELECT_VENDOR,
      vendor: category,
    });
  }

  return (
    <div className="col-6">
      <div className="card mb-3 p-2">
        <img
          src={image}
          style={{ height: "18rem" }}
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between">
            <h6 className="card-title">{price}₴</h6>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
