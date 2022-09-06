import React from "react";
import { Modal } from "react-bootstrap";
import { Button} from 'antd';
import {Form, Input} from 'antd';
import {useForm} from "antd/es/form/Form";
import "../NavWindow.scss"
import axios from "axios";
import authHeader from "../../../../service/auth-header";
import { BASE_URL } from "../../../../service/config/ApiConfig";

function NavEdit(props) {
    const [challengeForm] = useForm();

    const [name, setName] = React.useState(props.name);
    const [englishName, setEnglishName] = React.useState(props.englishName);
    const handleNameChange = (value) => {
        setName(value);
    }
    const handleEnglishNameChange = (value) => {
        setEnglishName(value);
    }

    const onFinish = (values) => {

        if (values.name === undefined) {
            values.name = props.name
        }
        if (values.englishName === undefined) {
            values.englishName = props.value
        }

        updateType(values)
        .then((response) => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            window.location.reload();
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const updateType= async (data) => {
        return await fetchRequest
            .put(BASE_URL + "/" + props.type + "/update/" + props.id, {
                id: Number(data.id),
                englishName: data.englishName,
                name: data.name
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    };

    const fetchRequest = axios.create({
    headers: {
        "content-type": "application/json",
        "Authorization": authHeader()
    }
})

    return(      
    <Modal {...props} aria-labelledby="NavWindow" className="NavWindow">
        <Modal.Header closeButton>
            <Modal.Title id="NavWindow">
                Редагувати <b>{props.name}</b>
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
                <Form.Item
                    label="Англійська назва(пошуковий тип)"
                    name="englishName"
                    value={englishName}
                    onChange={handleEnglishNameChange}>
                    <Input defaultValue={props.englishName}/>
                </Form.Item>
                <Form.Item
                    label="Українська назва(відображення на сайті)"
                    name="name"
                    value={name}
                    onChange={handleNameChange}>
                    <Input defaultValue={props.name} />
                </Form.Item>
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

export default NavEdit;
