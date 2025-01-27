import React, {createContext, useState, useEffect} from "react";


//create context
export const ShopContext = createContext();

//import Shop data
import { productsData} from '../data';

const ShopContextProvider = ({children}) => {
  // product state
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  // cart state
  const [cart, setCart] = useState([]);

  // item amount
  const [itemAmount, setItemAmount] = useState(0); 
  // total price state
  const [total, setTotal] = useState(0);

  // Function to filter products based on the search query
const searchProducts = (query) => {
  // Check if the search query is empty
  if (query === '') {
    // If empty, reset to show all products
    setFilteredProducts(products);
  } else {
    // Filter products where the title includes the query (case-insensitive)
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    // Update the filtered products state
    setFilteredProducts(filtered);
  }
};

// Calculate the total price of items in the cart whenever the cart changes
useEffect(() => {
  // Use reduce to calculate the total price
  const total = cart.reduce((accumulator, currentItem) => {
    // Convert price to a number
    const priceAsNumber = parseFloat(currentItem.price);
    // Skip invalid prices
    if (isNaN(priceAsNumber)) {
      return accumulator;
    }
    // Add price times quantity to the accumulator
    return accumulator + priceAsNumber * currentItem.amount;
  }, 0); // Initial accumulator value is 0
  // Log the total for debugging
  console.log('Total:', total);
  // Update the total state
  setTotal(total);
}, [cart]); // Dependency array ensures this effect runs when the cart changes

// Calculate the total number of items in the cart whenever the cart changes
useEffect(() => {
  // Check if the cart is not empty
  if (cart) {
    // Use reduce to sum up the quantities of all items
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount; // Add the current item's amount to the accumulator
    }, 0); // Initial accumulator value is 0
    // Update the total item amount state
    setItemAmount(amount);
  }
}, [cart]); // Dependency array ensures this effect runs when the cart changes

// Function to add a product to the cart
const addToCart = (product, id) => {
  // Create a new item with an initial quantity of 1
  const newItem = { ...product, amount: 1 };

  // Find if the product is already in the cart
  const cartItem = cart.find((item) => {
    return item.id === id; // Check if item ID matches
  });

  // If the product is already in the cart
  if (cartItem) {
    // Map over the cart to update the quantity of the existing item
    const newCart = [...cart].map((item) => {
      // If the current item's ID matches the product's ID, increase its quantity
      if (item.id === id) {
        return { ...item, amount: cartItem.amount + 1 };
      } else {
        // Otherwise, return the item as is
        return item;
      }
    });
    // Update the cart state with the updated quantities
    setCart(newCart);
  } else {
    // If the product is not in the cart, add it to the cart
    setCart([...cart, newItem]);
  }
};

// Function to remove a product from the cart
const removeFromCart = (id) => {
  // Filter out the product with the specified ID
  const newCart = cart.filter((item) => {
    return item.id !== id; // Keep only items whose ID doesn't match
  });
  // Update the cart state
  setCart(newCart);
};

// Function to clear all items from the cart
const clearCart = () => {
  // Set the cart to an empty array
  setCart([]);
};

// Function to increase the quantity of a specific product in the cart
const increaseAmount = (id) => {
  // Find the product in the cart by its ID
  const cartItem = cart.find((item) => item.id === id);
  // Call addToCart to reuse the logic for increasing quantity
  addToCart(cartItem, id);
};

// Function to decrease the quantity of a specific product in the cart
const decreaseAmount = (id) => {
  // Find the product in the cart by its ID
  const cartItem = cart.find((item) => {
    return item.id === id;
  });

  // If the product exists in the cart
  if (cartItem) {
    // Map over the cart to update the quantity of the product
    const newCart = cart.map((item) => {
      // If the current item's ID matches the product's ID, decrease its quantity
      if (item.id === id) {
        return { ...item, amount: cartItem.amount - 1 };
      } else {
        // Otherwise, return the item as is
        return item;
      }
    });
    // Update the cart state with the updated quantities
    setCart(newCart);
  } else {
    // If the product's quantity is less than 2, remove it from the cart
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  }
};

  
  
  return <ShopContext.Provider value={{
    filteredProducts,products, searchProducts , cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total,
  }
  }>{children}</ShopContext.Provider>;

};

export default ShopContextProvider;
