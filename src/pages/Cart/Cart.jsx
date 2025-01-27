import React, { useContext } from "react";
import CartDetails from '../Cart/CartDetails'
import { FiTrash2 } from "react-icons/fi";

// Import cart context
import { ShopContext } from "../../Context/ShopContext";

const Cart = () => {
  const { cart, clearCart, total, itemAmount } = useContext(ShopContext);

  console.log("Cart:", cart);
  return (
    <div className="flex justify-between p-5">
      <div className="w-2/3 bg-white p-5 mt-5">
        <div className="flex justify-between font-bold">
          <h1>Shopping Cart</h1>
          <h1>Items: {itemAmount}</h1>
          <FiTrash2 onClick={clearCart} className="text-xl cursor-pointer" />
        </div>
        <div className="flex justify-between mt-5 font-bold">
          <span>Product Description</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total</span>
        </div>
        <div className="mt-5">
          {cart.length > 0 ? (
            cart.map((item) => <CartDetails item={item} key={item.id} />)
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
      <div className="w-1/3 bg-gray-100 p-5 rounded-lg mt-5">
        <h2 className="text-lg font-bold mb-5">Cart Summary</h2>
        <div className="flex justify-between mb-3">
          <span>Items:</span>
          <span>{itemAmount}</span>
        </div>
        <div className="mb-5">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$ {isNaN(total) ? 0 : total}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-3">
            <span>Total Cost</span>
            <span>$ {isNaN(total) ? 0 : total}</span>
          </div>
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-5 hover:bg-blue-600">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
