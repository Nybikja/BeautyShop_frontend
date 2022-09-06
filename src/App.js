import React from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import { BASE_URL } from './service/config/ApiConfig';
import AdminPanel from './AdminPanel/AdminPanel.jsx';
import ShoppingPage from './pages/ShoppingPage/ShoppingPage';
import DavinesPage from './pages/DavinesPage/DavinesPage';
import MainPage from './pages/MainPage/MainPage';
import OrderPage from './pages/OrderPage/OrderPage'
import { Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';


  
function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
    const [show, setShow] = React.useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
        setCartItems(
            cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
            )
        );
        } else {
        setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };
    
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
        setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
        setCartItems(
            cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
            )
        );
        }
    };
    

    React.useEffect(() => {
        axios.get(BASE_URL + "products")
        .then((res) => {
            setItems(res.data);
        });
    }, []);

    return (
            <div className='wrapper clear'>    
                <Header countCartItems={cartItems.length} handleShow={handleShow}/>
                <Cart
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow  }
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                ></Cart>
                <Routes>    
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/davines" element={<DavinesPage/>}/>
                    <Route path="/i-love-cocks" element={<AdminPanel/>}/>
                    <Route path="/order" element={
                        <OrderPage
                        show={show}
                        handleClose={handleClose}
                        handleShow={handleShow  }
                        cartItems={cartItems}
                        onAdd={onAdd}
                        onRemove={onRemove}/>}/>
                    <Route path="/shopping" element={<ShoppingPage key="{key}" products={items} onAdd={onAdd}/>}/>
                </Routes>
            </div>
    );
}

export default App;


