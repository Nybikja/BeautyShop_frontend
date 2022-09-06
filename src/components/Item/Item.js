import React from "react";
import { BASE_URL } from "../../service/config/ApiConfig";
import ContentLoader from "react-content-loader"

import "./Item.scss"
import ModalItem from './ModalItem';

function Item(props, item ){
    const [modalItemShow, setModalItemShow] = React.useState(false);
    const { product, onAdd} = props;

    const [isAdded, setIsAdded] = React.useState(false);
    const onClicklPlus = () =>{
        setIsAdded(true);
        onAdd(product)
    }

    return(
        <>
        <div className="content mx-auto col-lg-3 col-md-4 col-10">
           {props.loading ? <ContentLoader 
                speed={2}
                width={"100%"}
                height={"480"}
                viewBox="0 0 100% 480"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >

                <rect x="0" y="2" rx="10" ry="10" width="100%" height="350" /> 
                <rect x="5" y="370" rx="0" ry="0" width="95%" height="24" /> 
                <rect x="5" y="408" rx="0" ry="0" width="80%" height="24" /> 
                <rect x="5" y="456" rx="0" ry="0" width="30%" height="24" /> 
                <rect x="85%" y="454" rx="10" ry="10" width="28" height="28" />
            </ContentLoader>  :
            
            <><div className="item">
                <div className="photo allcenter">
                        <button className="allcenter" variant="primary" onClick={() => setModalItemShow(true)}>
                            <img src={BASE_URL+ "image" + product.imageUrl} alt="" />
                            <p>Детальніше</p>
                        </button>
                   
                </div> 
                <div className="item-text">
                    <p className="name">{product.name}</p>
                    <div className="price d-flex justify-content-between align-items-center">
                        <p className="price-num">{product.price} ₴</p>
                        <button className="btn-plus" onClick={onClicklPlus}>
                            <img 
                            src={isAdded ? "/imgjs/icons/checked.svg" : "/imgjs/icons/cart-plus-solid.svg"} alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <ModalItem
            show={modalItemShow}
            onHide={() => setModalItemShow(false)}
            isAdded={isAdded}
            onClicklPlus={onClicklPlus}
            product={product}
            /></>}
        </div>
        
        </>
    );
}

export default Item;