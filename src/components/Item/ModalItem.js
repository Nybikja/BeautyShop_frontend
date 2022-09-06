import React from "react";
import {Modal, } from 'react-bootstrap';
import { BASE_URL } from "../../service/config/ApiConfig";
import {  searchTypes } from "../../pages/ShoppingPage/NavTV.js";

function ModalItem({ show, onHide,product ,
    onClicklPlus, isAdded}){
  
    const [transProdType] = [searchTypes[0].getSearchValue]
    const [transHairType] = [searchTypes[1].getSearchValue]
    const [transProdLine] = [searchTypes[2].getSearchValue]



    return(
    <Modal show={show} onHide={onHide} >
        <div className="modal-all">
            <Modal.Header closeButton>
                <Modal.Title>Детальніше</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-12">
                    <div className="body-top row m-0">
                        <div className="modal-image allcenter col-6">
                            <img src={BASE_URL+ "image/" + product.imageUrl} alt="" />
                        </div>
                        <div className="modal-name col-6 text-center allcenter">
                            <p className="fw-normal">{product.name}</p>
                        </div>
                    </div>
                    <div className="body-bottom row m-0">
                    <div className="modal-filter   allbetween my-1">
                        <p key="{translate0}">{product.productType.name}</p>
                        <div className="line-y"></div>
                        <p key="{translate0}">{product.hairType.name}</p>
                        <div className="line-y"></div>
                        <p key="{translate0}">{product.productLine.name}</p>
                    </div>
                        <div className="modal-description col-12 text-center allcenter my-3">
                            <p className="fw-light text-start">{product.description}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">
                <div className="modal-price row">
                    <p className="fw-normal">{product.price} грн</p>
                </div>
                <button className="btn-plus" onClick={onClicklPlus}>
                    <img src={isAdded ? "/imgjs/icons/checked.svg" : "/imgjs/icons/cart-plus-solid.svg"} alt="" />
                </button>
            </Modal.Footer>
        </div>
    </Modal>
    );
}

export default ModalItem;