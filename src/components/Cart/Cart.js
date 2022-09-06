import { Offcanvas } from "react-bootstrap";
import { BASE_URL } from "../../service/config/ApiConfig";
import { Link } from "react-router-dom";

import "./Cart.scss";

function Cart(props) {
    const { cartItems, onAdd, onRemove, show, handleClose } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const totalPrice = itemsPrice;
  

    let showButton;
    if (cartItems.length > 0) {
        showButton = true;
    }
    return(
        <Offcanvas show={show} onHide={() => {handleClose();}} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Корзина</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="ps-1">
                <div className="cart-items ps-3">
                    {!showButton && <p>Корзина пуста :)</p>}
                    {
                    cartItems.map((obj) =>
                        (<div key={obj.id} className="cart-item row allcenter">
                            <div className="row">
                                <div className="photo allcenter">
                                    <img src={BASE_URL+ "image" + obj.imageUrl} alt="Davines" />
                                </div>
                                <div className="cart-text">
                                    <p>{obj.name}</p>
                                    <p>{obj.price} ₴</p>
                                    <p>Кількість: {obj.qty}</p>
                                </div>
                            </div>
                            <div className="row upline text-center">
                                <div className="delete-item allcenter">
                                    <button onClick={() => onRemove(obj)}>
                                        {obj.qty===1 ?
                                            <img src="/imgjs/icons/delete.svg" alt="" />
                                            :<img src="/imgjs/icons/minus.svg" alt="" />}
                                        <img src="/imgjs/icons/minus.svg" alt="" />
                                    </button>
                                </div>
                                <p className="amount leftline">{obj.qty}</p>
                                <div className="delete-item leftline allcenter">
                                    <button onClick={() => onAdd(obj)} className="add">
                                        <img src="/imgjs/icons/plus.svg" alt="" />
                                    </button>
                                </div>

                           </div>
                        </div>)
                    )
                    }
                </div>
            </Offcanvas.Body>
            <div className="summary">
                <div className="sum d-flex align-items-center justify-content-between">   
                    <span>Сума:</span>
                        <b>{totalPrice.toFixed(2)}</b>
                </div>
                    {showButton && ( 
                        <Link to="/order" label="OrderPage">
                            <button  onClick={() => handleClose(true)}>Оформити замовлення.</button>    
                        </Link>
                    )} 
                    {!showButton && ( 
                        <h2>Спочатку добавте товар у корзину</h2>
                    )} 
            </div>

            
        </Offcanvas>
        
    );
};

export default Cart;