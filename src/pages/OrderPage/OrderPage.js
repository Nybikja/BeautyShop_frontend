import './Order.scss'
import { Button } from 'react-bootstrap';
import { BASE_URL } from "../../service/config/ApiConfig";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InputMask from "react-input-mask";


function Order(props){
    const { cartItems, onAdd, onRemove } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const totalPrice = itemsPrice;
    const [typeOfShipping, setTypeOfShipping] = useState("post")
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [city, setCity] = useState();
    const [numberOfNovaPoshta, setNumberOfNovaPoshta] = useState()
    const [address, setAddress] = useState();
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        sendNotification()
        setValidated(true);
      };

      

    const [checkedNovaPoshta, setCheckedNovaPoshta] = useState(false);
    const [checkedSelf, setCheckedSelf] = useState(false);
    const [checkedTaxi, setCheckedTaxi] = useState(false);


    const TOKEN_TG = "5419234394:AAEqD9fZsonaoOStqOBV-wVMMzxeRpVyulw";

    const sendNotification = async () => {
        const endpoint = `https://api.telegram.org/bot${TOKEN_TG}/sendMessage`;
        const CHAT_ID = "-685837917";
        var order = ""
        if(cartItems.length === 0) {
            window.alert("Корзина пуcта")
            return
        }
        const totalPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0)
        cartItems.map((item) => (
            // eslint-disable-next-line
            order +=  "Назва: " +item.name + "\n" + "Ціна: " + item.price + "\n"
                + "Кількість: " + item.qty + "\n\n"
        ))
        order += "Загальна вартість: " + totalPrice + "грн. \n\n"
        order += "Імʼя: " + name + "\nПрізвище: " + surname + "\nНомер телефону: " + phoneNumber + "\n\n";
        
        if (typeOfShipping === "post") {
            order += "Тип доставки: Нова Пошта \nМісто: " + city + "\nВідділення нової пошти: №" + numberOfNovaPoshta;
        }
        if (typeOfShipping === "taxi") {
            order += "Тип доставки: Таксі \nАдрес:" + address;
        }
        if (typeOfShipping === "self") {
            order += "Тип доставки: Самовивіз";
        }
      localStorage.clear()
        await makePostRequest(endpoint,
            {
                text: order,
                chat_id: CHAT_ID
            });
        window.alert("Замовлення відправлено!")
        window.location.reload()
    };

  


    const makePostRequest = async (url, details) => {
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(details),
            });
        return await response.json()
    };

  
    const  checkControll = async (setSecond, setThird, ship) => {
        setSecond(false);
        setThird(false);
        setTypeOfShipping(ship);
    };

    React.useEffect(() => {
        setCheckedNovaPoshta(true)
        
        
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className='allcenter'>
        <div className='order text-center p-3'>
            <h2 className='mb-2 px-3 allbetween'>Ваше замовлення <span>Сума: {totalPrice.toFixed(2)}</span></h2>
            <div className="order-items p-2 underline" >
                <div className="order-list m-0 ps-3 pt-2">
                    {cartItems.length === 0 && <p>Корзина пуста :)</p>}
                    {cartItems.map((obj) =>
                        (<div key={obj.id} className="cart-item order-item row allcenter">
                            <div className="row order-content">
                                <div className="photo allcenter">
                                    <img src={BASE_URL+ "image" + obj.imageUrl} alt="Davines" />
                                </div>
                                <div className="cart-text">
                                    <p>{obj.name}</p>  
                                    <p>{obj.price} ₴</p> 
                                </div>
                            </div>
                            <div className="row upline">
                                <div className="delete-item allcenter">
                                    <button onClick={() => onRemove(obj)}>
                                        <img src={obj.qty===1    
                                            ? "/imgjs/icons/delete.svg"  
                                            :"/imgjs/icons/minus.svg"} alt="" />
                                    </button>
                                </div>
                                <p className="amount leftline">{obj.qty}</p>
                                <div className="delete-item leftline allcenter">
                                    <button onClick={() => onAdd(obj)} className="add">
                                        <img src="/imgjs/icons/plus.svg" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>
                <Form validated={validated} onSubmit={handleSubmit}>
                <InputGroup >
                    <InputGroup.Text>Прізвище</InputGroup.Text>
                    <Form.Control required  onChange={e => setSurname(e.target.value)} aria-label="Last name" placeholder='Зеленський'/>
                </InputGroup>
                <InputGroup >
                    <InputGroup.Text>Імʼя</InputGroup.Text>
                    <Form.Control required  onChange={e => setName(e.target.value)} aria-label="name" placeholder='Володимир'/>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Телефон</InputGroup.Text>
                    <InputMask required   className='form-control' id='tel'  type="tel" aria-label="number" placeholder='+380 (12) 345-67-89' mask="+380 (99) 999-99-99" onChange={e => setPhoneNumber(e.target.value)}/>
                </InputGroup>
               
               
                <div className="mt-3 order-info text-center">
                    <h2>Дані про відправку</h2>
                    <Tabs
                    defaultActiveKey="novaposhta"
                    id="justify-tab"
                    >
                    <Tab eventKey="novaposhta" 
                            title={<div className='form'  
                                onClick={() =>  { setCheckedNovaPoshta(true);
                                            checkControll(setCheckedSelf,setCheckedTaxi,"post")}}>
                                        <Form.Check
                                        readOnly
                                        label="Нова Пошта"
                                        name="delivery"
                                        type="switch"
                                        id='inline-radio-1'
                                        checked={checkedNovaPoshta} />
                                    </div>}>
                        <InputGroup >
                            <InputGroup.Text>Місто</InputGroup.Text>
                            <Form.Control required={checkedNovaPoshta? true: false} onChange={e => setCity(e.target.value)} aria-label="Last name" placeholder='Львів'/>
                        </InputGroup>
                        <InputGroup >
                            <InputGroup.Text>Відділення</InputGroup.Text>
                            <Form.Control  type="number" required={checkedNovaPoshta? true: false} onChange={e => setNumberOfNovaPoshta(e.target.value)} aria-label="Last name" placeholder='1'/>
                        </InputGroup>
                    </Tab>
                    <Tab eventKey="self" title={
                            <div    className='form'   
                                    onClick={() =>  {setCheckedSelf(true);
                                    checkControll(setCheckedNovaPoshta,setCheckedTaxi,"self")}}>
                                
                                <Form.Check
                                readOnly
                                label="Самовивіз"
                                name="delivery"
                                type="switch"
                                id='inline-radio-2'
                                checked={checkedSelf}/>
                            </div>}>
                        <p> Самовивіз здійснюється за адресою </p>
                        <a href="https://goo.gl/maps/qDuHgiwSY9W2MsTt8" target="_blank" role="button" rel="noreferrer">
                            м. Львів, с. Сокільники, вул. Весняна 6 (Салон Краси "BeautyClub")
                        </a>
                    </Tab>
                 
                    <Tab eventKey="taxi" title={
                            <div className='form' onClick={() =>  {setCheckedTaxi(true);
                                checkControll(setCheckedNovaPoshta,setCheckedSelf,"taxi")}}>
                                <Form.Check
                                readOnly
                                label="Доставка (Львів)"
                                name="delivery"
                                type="switch"
                                id='inline-radio-3'
                                checked={checkedTaxi}/>
                            </div>}>
                        <InputGroup>
                            <InputGroup.Text>Адреса</InputGroup.Text>
                            <Form.Control required={checkedTaxi? true: false} onChange={e => setAddress(e.target.value)} aria-label="street" placeholder='вул. Степана Бандери 91'/>
                        </InputGroup>
                    </Tab>
                </Tabs>
                <span >Натискаючи "Завершити замовлення", ви даєте згоду на обробку персональних даних.</span>
                <Button type="submit" id='finishorder' ><p>Завершити замовлення</p></Button>
               </div>
                </Form>
               

            </div>
        </div>
    );

}

export default Order;