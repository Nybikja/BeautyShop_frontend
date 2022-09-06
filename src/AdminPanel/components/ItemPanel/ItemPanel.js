import React from 'react';
import { BASE_URL } from '../../../service/config/ApiConfig';
import EditWindow from '../EditWindow/EditWindow';
import SureDelete from '../SureDelete/SureDelete';

import "./ItemPanel.scss"

function ItemPanel({id, name, description,price, imageUrl, hairType, productType, productLine}) {

    const [editShow, setEditShow] = React.useState(false);
    const [deleteShow, setDeleteShow] = React.useState(false);


    return(
        <>
            <div className="item d-flex align-items-center">
                <div className="item-imgUrl">
                    <img src={BASE_URL+ "image" + imageUrl} alt=""/>
                </div>
                <div className="item-name text-start"><p>{name}</p></div>
                <div className="item-action d-block">
                    <button onClick={() => setEditShow(true)} type="button">
                        <img src="/imgjs/icons/edit.svg" alt="" />
                    </button>
                    <button onClick={() => setDeleteShow(true)} type="button">
                        <img src="/imgjs/icons/delete.svg" alt="" />
                    </button>
                </div>
            </div>
            <SureDelete id={id} tittle={name} type={"product"} show={deleteShow} onHide={() => setDeleteShow(false)} />
            <EditWindow id={id} name={name} description={description} price={price} imageurl={imageUrl} hairtype={hairType} producttype={productType} productline={productLine} show={editShow} onHide={() => setEditShow(false)} />
        </>
    );
};
export default ItemPanel;






