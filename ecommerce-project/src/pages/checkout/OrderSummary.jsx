import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';
import axios from 'axios';
import { useState } from 'react';


function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const updateQuantity = async () => {
        if (isUpdatingQuantity) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            });
            await loadCart();
        }

        setIsUpdatingQuantity(!isUpdatingQuantity);
    }

    return (
        <div className="cart-item-details">
            <div className="product-name">
                {cartItem.product.name}
            </div>
            <div className="product-price">
                {formatMoney(cartItem.product.priceCents)}
            </div>
            <div className="product-quantity">
                <span>
                    Quantity: {isUpdatingQuantity ? (
                        <input
                            className="quantity-input"
                            type="text"
                            value={quantity}
                            onChange={(event) => {
                                setQuantity(event.target.value);
                            }} />
                    ) : (
                        <span className="quantity-label">{cartItem.quantity}</span>
                    )}
                </span>
                <span
                    className="update-quantity-link link-primary"
                    onClick={updateQuantity}>
                    Update
                </span>
                <span className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}>
                    Delete
                </span>
            </div>
        </div>
    )
}


export function OrderSummary({ cart, deliveryOptions, loadCart }) {
    return (
        <div className="order-summary">

            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions
                    .find((deliveryOption) => {
                        return deliveryOption.id === cartItem.deliveryOptionId;
                    });

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">

                            <img className="product-image"
                                src={cartItem.product.image} />

                            <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                            <DeliveryOptions deliveryOptions={deliveryOptions}
                                cartItem={cartItem} loadCart={loadCart} />

                        </div>
                    </div>
                )
            })}

        </div>
    )
}
