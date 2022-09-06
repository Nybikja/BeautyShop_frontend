import React from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../../service/config/ApiConfig";
import authHeader from "../../../service/auth-header";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import { createProduct } from "../../../service/ProductService";

import './ModalWindow.scss'

import { Form, Input, Button, message, Upload} from 'antd';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import { Modal } from "react-bootstrap";
import {useForm} from "antd/es/form/Form";



function UploadWindow(props) {
    const [productLines, setProductLines] = React.useState([]);
    const [productTypes, setProductTypes] = React.useState([]);
    const [hairTypes, setHairTypes] = React.useState([]);
    const [challengeForm] = useForm();
    const [name, setName] = React.useState([]);
    const [description, setDescription] = React.useState([]);
    const [price, setPrice] = React.useState([]);
    const [picture, setPicture] = React.useState([]);
    const [productLine, setProductLine] = React.useState([]);
    const [productType, setProductType] = React.useState([]);
    const [hairType, setHairType] = React.useState([]);
        
    useEffect(
        () => {
        fetch(BASE_URL + 'productLines')
            .then(response => {
                return response.json();
            }).then(data => { 
                setProductLines(data)
            });
        fetch(BASE_URL + 'productTypes')
            .then(response => {
                return response.json();
            }).then(data => { 
                setProductTypes(data)
            });

        fetch(BASE_URL + 'hairTypes')
            .then(response => {
                return response.json();
            }).then(data => { 
                setHairTypes(data)
            });
        },
        []
    );
    

    const handleNameChange = (value) => {
        setName(value);
    }
    const handlePriceChange = (value) => {
        setPrice(value);
    }
    const handleDescriptionChange = (value) => {
        setDescription(value);
    }
    const handlePictureChange = (value) => {
        setPicture(value);
    }
    const handleHairTypeChange = (value) => {
        setHairType(value);
    }
    const handleProductTypeChange = (value) => {
        setProductType(value);
    }
    const handleProductLineChange = (value) => {
        setProductLine(value);
    }



    const onFinish = (values) => {
        createProduct(values, hairType, productType, productLine)
            .then((response) => {
                console.log(values, hairType, productType, productLine)
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                window.location.reload();
            });
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(    
        
        <Modal {...props} aria-labelledby="uploadWindow" className="upload-window">
            <Modal.Header closeButton>
                <Modal.Title id="uploadWindow">
                    Додати товар
                </Modal.Title>
            </Modal.Header>
            <Form
                form={challengeForm}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}>
                <Modal.Body className="show-grid text-center">
                <Form.Item
                    name="picture"
                    label="Фото"
                    value={picture}
                    onChange={handlePictureChange}>
                    <Upload
                        name="image"
                        listType="picture-card"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder:`images`}}
                        headers={{contentType: 'multipart/form-data', Authorization: authHeader()}}>
                        <span className="upload-label"><UploadOutlined className="icon" />Завантажити</span>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Назва"
                    value={name}
                    onChange={handleNameChange}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Ціна"
                    name="price"
                    value={price}
                    onChange={handlePriceChange}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Опис"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}>
                    <Input />
                </Form.Item>

                <div className="input-group mb-3">
                    <label htmlFor="hairType" className="input-group-text" id="hairType">Тип Волосся</label>
                    <select onChange={e => handleHairTypeChange(e.target.value)} name="hairType">
                        <option>{hairType}</option>
                            {hairTypes.map(hairType => <option key={hairType.id} >{hairType.name}</option>)}
                        </select>
                    </div>
                <div className="input-group mb-3">
                    <label htmlFor="productType" className="input-group-text" id="prodType">Тип продукції</label>
                    <select onChange={e => handleProductTypeChange(e.target.value)} name="productType">
                        <option selected>{productType}</option>
                        {productTypes.map(productType => <option key={productType.id} >{productType.name}</option>)}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="productLine" className="input-group-text" id="lineType">Лінія</label>   
                    <select onChange={e => handleProductLineChange(e.target.value)} name="productLine">
                        <option>{productLine}</option>
                        {productLines.map(productLine => <option key={productLine.id} >{productLine.name}</option>)}
                    </select>
                </div>

                </Modal.Body>
                <Modal.Footer>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="save-btn add-contact-type-button">
                            Зберегти
                        </Button>
                    </Form.Item>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UploadWindow;