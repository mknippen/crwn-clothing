export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

    if (existingCartItem) {
        console.log("Existing Item");

        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    } else {
        console.log("New Item");
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
} 