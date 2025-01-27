import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// Import icons
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
// Import cart context
import { ShopContext } from '../../Context/ShopContext'

const CartDetails = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(ShopContext);

  // Destructure item
  const { id, title, image, price, amount } = item;

  return (
    <div className="flex justify-between items-center mt-5 border-b pb-3">
  <div className="flex items-center space-x-4">
    <img src={image} alt={title} className="w-16 h-16" />
    <div>
      <h3 className="font-medium">
        <Link to={`/product/${id}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div
        className="text-red-500 text-sm cursor-pointer flex items-center"
        onClick={() => removeFromCart(id)}
      >
        <FiTrash2 className="mr-1" /> Remove
      </div>
    </div>
  </div>
  <div className="flex items-center">
    <button
      onClick={() => decreaseAmount(id)}
      className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center"
    >
      <IoMdRemove />
    </button>
    <span className="mx-3">{amount}</span>
    <button
      onClick={() => increaseAmount(id)}
      className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center"
    >
      <IoMdAdd />
    </button>
  </div>
  <div className="text-gray-700">${price}</div>
  <div className="text-gray-700 font-medium">{`$ ${parseFloat(
    price * amount
  ).toFixed(2)}`}</div>
</div>

  );
};

export default CartDetails;
