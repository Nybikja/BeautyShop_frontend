import React from "react";
import { Modal } from "react-bootstrap";
import { Button} from 'antd';

import Tabs from 'react-bootstrap/Tabs';
import "./NavWindow.scss"
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';

import {searchTypes} from '../../../pages/ShoppingPage/NavTV';
import Value from "./comp/Value";
import NavAdd from "./comp/NavAdd";
import axios from "axios";
import { BASE_URL } from "../../../service/config/ApiConfig";

function NavWindow(props) {
    const [values, setValues] = React.useState([]);
    const [addShow, setAddShow] = React.useState(false);
    
    function getValues(type) {
        axios.get(BASE_URL + type).then(res => {
            setValues(res.data)
        });
    }

    React.useEffect(() => {
        getValues("productTypes");
    }, []);

    return(      
    <>
    <Modal {...props} aria-labelledby="NavWindow" className="nav-window">
        <Modal.Header closeButton>
            <Modal.Title  id="NavWindow" >
                Асортимент
            </Modal.Title>
            <Button
                onClick={() => setAddShow(true)}
                type="primary"
                htmlType="submit"
                className="save-btn add-contact-type-button ms-5">
                    Додати
            </Button>
        </Modal.Header>
            <Modal.Body className="show-grid text-center p-0">
                <Tabs
                id="fill-tab-example"
                className="mt-3"
                fill>
                
                {searchTypes.map((types,index) =>(  
                    <Tab    key={index}
                            title={ <div className="allcenter" onClick={() =>  {getValues(types.getSearchValue)}}><p>{types.Name}</p></div>}
                            eventKey={types.Name}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th><p>Велью</p></th>
                                    <th><p>Редагувати</p></th>
                                </tr>
                            </thead>
                        <tbody>
                            {values.map((value, index) =>(
                                    <Value type={types.getSearchValue} key={index} content={value}></Value>                           
                            ))}
                        </tbody>
                        </Table>
                    </Tab>
                    ))}
                </Tabs>
            </Modal.Body>
        </Modal>
        <NavAdd  show={addShow} onHide={() => setAddShow(false)}/>
    </>
    );
};

export default NavWindow;
