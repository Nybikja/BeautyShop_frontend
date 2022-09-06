import React from "react";
import { Modal } from "react-bootstrap";
import { Button} from 'antd';
import {Form, Input} from 'antd';
import {useForm} from "antd/es/form/Form";
import "../NavWindow.scss"
import {searchTypes} from '../../../../pages/ShoppingPage/NavTV';
import authHeader from "../../../../service/auth-header";
import axios from "axios";
import { BASE_URL } from "../../../../service/config/ApiConfig";


function NavAdd(props) {
    const [challengeForm] = useForm();

    const [name, setName] = React.useState([]);
    const [englishName, setEnglishName] = React.useState([]);
    const [type, setType] = React.useState("productTypes");

    const handleNameChange = (value) => {
        setName(value);
    }
    const handleEnglishNameChange = (value) => {
        setEnglishName(value);
    }
    const handleTypeChange = (value) => {
        setType(value);
    }


    const fetchRequest = axios.create({
        headers: {
            "content-type": "application/json",
            "Authorization": authHeader()
        }
    })

    const createValue = async (value) => {
        return await fetchRequest
            .post(BASE_URL + type, {
                name: value.name,
                englishName: value.englishName,
            },
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    };

    const onFinish = (values) => {
        createValue(values)
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
    return(      
    <Modal {...props} aria-labelledby="AddWindow" className="NavWindow">
        <Modal.Header closeButton>
            <Modal.Title id="AddWindow">
                Додати Велью
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
            <Modal.Body className="show-grid text-center values">
                <div className="input-group mb-3">
                    <label className="input-group-text">Пошуковий Тип</label>
                    <select onChange={e => handleTypeChange(e.target.value)}>
                            {searchTypes.map((type, index) =>(
                                    <option key={index} >{type.getSearchValue}</option>                          
                            ))}
                    </select>
                </div>
                <Form.Item
                    label="Ім'я"
                    name="name"
                    value={name}
                    onChange={handleNameChange}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Пошукове значення"
                    name="englishName"
                    value={englishName}
                    onChange={handleEnglishNameChange}>
                    <Input/>
                </Form.Item>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="save-btn add-contact-type-button">
                    Додати
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
    );
};

export default NavAdd;
