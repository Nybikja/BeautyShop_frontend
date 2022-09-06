import React from "react";
import { Modal } from "react-bootstrap";
import { BASE_URL } from '../../../service/config/ApiConfig';
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import { updateProduct } from "../../../service/ProductService";

import './ModalWindow.scss'

import { useEffect } from "react";
import {Form, Input, Button, message, Upload} from 'antd';
import {useForm} from "antd/es/form/Form";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";



function EditWindow(props) {
    const [productLines, setProductLines] = React.useState([]);
    const [productTypes, setProductTypes] = React.useState([]);
    const [hairTypes, setHairTypes] = React.useState([]);
    
    const [imageUrl, setImageUrl] = React.useState(BASE_URL + "image/")
    const [id, setId] = React.useState(props.id)
    const [name, setName] = React.useState(props.name);
    const [description, setDescription] = React.useState(props.description);
    const [price, setPrice] = React.useState(props.price);
    const [picture, setPicture ] = React.useState(props.imageurl);
    const [productLine, setProductLine] = React.useState(props.productline);
    const [productType, setProductType] = React.useState(props.producttype);
    const [hairType, setHairType] = React.useState(props.hairtype);

    const [challengeForm] = useForm();

    var BASE_IMAGE_URL = BASE_URL + "image/";


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
    

      const onFinish = (values) => {
        if (values.id === undefined) {
            values.id = props.id
        }
        if (values.name === undefined) {
            values.name = props.name
        }
        if (values.picture === undefined) {
            values.picture = props.imageurl
        }
        if (values.description === undefined) {
            values.description = props.description
        }
        if (values.price === undefined) {
            values.price = props.price
        }
        updateProduct(values, hairType, productType, productLine)
        .then((response) => {
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

    const handleIdChange = (value) => {
        
        if (value !== undefined) {
            setId(value);
        }           
    }

    const handleNameChange = (value) => {
        setName(value);
    }
    const handlePriceChange = (value) => {
        setPrice(value);
    }
    const handleDescriptionChange = (value) => {
        setDescription(value);
    }
    const handleHairTypeChange = (value) => {
        if (value !== undefined) {
            console.log(value)
            setHairType(value);
        }
    }
    const handleProductTypeChange = (value) => {
        if (value !== undefined) {
            console.log(value)
            setProductType(value);
        }
    }
    const handleProductLineChange = (value) => {
        if (value !== undefined) {
            console.log(value)
            setProductLine(value);
        }
    }
    const handlePictureChange = (value) => {
        if (value.target.files === undefined) {
            setPicture(picture)
        } else {
            setImageUrl(BASE_IMAGE_URL + "images/")
            setPicture(value.target.files[0].name)
        }
    }
      
    return(      
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="edit-window">
        <Modal.Header closeButton>
            <Modal.Title id="editWindow">
                Редагувати товар
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
            <img alt="Product" className="img-holder" src={imageUrl + picture}></img>
                <Form.Item
                name="picture"
                value={picture}
                onChange={handlePictureChange}>
                    <Upload
                        name="image"
                        showUploadList={false}
                        listType="picture-card"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder:`images`}}
                        headers={{contentType: 'multipart/form-data'}}>
                        <span className="upload-label"><UploadOutlined className="icon" />Завантажити</span>
                    </Upload>
                </Form.Item>
                
                <Form.Item
                    name="id"
                    label="ID"
                    value={id}
                    onChange={handleIdChange}>
                    <Input defaultValue={id}/>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Назва"
                    value={name}
                    onChange={handleNameChange}>
                    <Input defaultValue={name}/>
                </Form.Item>
                <Form.Item
                    label="Ціна"
                    name="price"
                    value={price}
                    onChange={handlePriceChange}>
                    <Input defaultValue={price}/>
                </Form.Item>

                <Form.Item
                    label="Опис"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}>
                    <Input defaultValue={description}/>
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
                        <option>{productType}</option>
                        {productTypes.map(productType => <option key={productType.id} >{productType.name}</option>)}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="productLine" className="input-group-text" id="lineType">Лінія</label>   
                    <select aria-label="222" onChange={e => handleProductLineChange(e.target.value)} name="productLine" >
                        <option>{productLine}</option>
                        {productLines.map(productLine => <option key={productLine.id} >{productLine.name}</option>)}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="save-btn add-contact-type-button">
                    Зберегти
                </Button>
            </Modal.Footer>
        </Form>   
    </Modal>
    );
};

export default EditWindow;
