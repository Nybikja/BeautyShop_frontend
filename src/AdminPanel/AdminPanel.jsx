import React from 'react';
import './AdminPanel.scss';
import UploadWindow from './components/EditWindow/UploadWindow';
import EditWindow from './components/EditWindow/EditWindow';
import NavWindow from './components/NavWindow/NavWindow';
import ItemPanel from './components/ItemPanel/ItemPanel.js';
import { BASE_URL } from '../service/config/ApiConfig';
import Login from './components/Login/Login';
import authService from "../service/auth.service";
import axios from 'axios';
import { Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import authHeader from '../service/auth-header';


function AdminPanel() {
    const [updateShow, setUpdateShow] = React.useState(false);
    const [navShow, setNavShow] = React.useState(false);

    const [items, setItems] = React.useState([]);
    const productsPerPage = 10;
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState();
    const [totalElements, setTotalElements] = React.useState();
    const [searchInput, setSearchInput] = React.useState();
    const user = authService.getCurrentUser();
    let showAdminBoard;
    if (user !== null) {
      showAdminBoard = user.roles.includes("ROLE_ADMIN");
    }

    function findAllProducts(currentPage) {
        axios.get(BASE_URL + "products?page=" + currentPage + "&size=" + productsPerPage).then(res => {
            setCurrentPage(currentPage - 1);
            setItems(res.data.content);
            setTotalElements(res.data.totalElements);
            setTotalPages(res.data.totalPages - 1);
            setCurrentPage(res.data.number);
        });
    }

    React.useEffect(() => {
        findAllProducts(currentPage);
    }, []);
  
    function firstPage() {
        let firstPage = 0;
  
        if (currentPage > firstPage) {
            findAllProducts(firstPage);
        }
    }
  
    ;
  
    function prevPage() {
        let prevPage = 0;
        console.log("prevpage");
  
        if (currentPage > prevPage) {
            console.log(currentPage);
            findAllProducts(currentPage - 1 - prevPage);
        }
    }
  
    ;
  
    function lastPage() {
        let condition = Math.ceil(totalElements / productsPerPage);
  
        if (currentPage < condition) {
            findAllProducts(condition - 1);
        }
    }
  
    ;
  
    function nextPage() {
        if (currentPage < Math.ceil(totalElements / productsPerPage)) {
            findAllProducts(currentPage + 1);
        }
    }
  
    ;
  
    function searchData() {
        findAllProducts(Number(searchInput) - 1);
    }
  
    ;
  
    // function cancelSearch() {
    //     setSearchInput("");
    //     findAllProducts(currentPage);
    // }

    return(
        <div className="admin-wrapper">
            <EditWindow/>
            {!showAdminBoard && (
                <Login/>
            )}
            <NavWindow show={navShow} onHide={() => setNavShow(false)}/>

            <UploadWindow show={updateShow} onHide={() => setUpdateShow(false)}/>
            {showAdminBoard && ( <>

            <div className="list-heading d-flex align-items-center justify-content-between">
                <button type="button" className="save-btn" onClick={() => setNavShow(true)}>
                    Асортимент
                </button>
                <button type="button" className="save-btn" onClick={() => setUpdateShow(true)}>
                    Додати товар
                </button>
            </div>
            
            <div className="admin-list">
                <div className="admin-list-heading d-flex align-center">
                    <div className="item-imgUrl"><p>фото</p></div>
                    <div className="item-name"><p>Ім'я</p></div>
                    <div className="item-action">
                        <p>Дія</p>
                    </div>
                </div>
                {
                    items.map ((item) =>
                        (
                        <ItemPanel 
                            key={item.id}
                            id = {item.id}
                            name={item.name} 
                            price={item.price} 
                            description={item.description}
                            imageUrl={item.imageUrl}
                            hairType={item.hairType.name}
                            productType={item.productType.name}
                            productLine={item.productLine.name}
                            />)
                    )
                }
            </div> 
            </>)}
              <div  className="row pagination">
              <div className="col-12 allcenter my-2 search">
                  <FormControl
                    placeholder="Пошук..."
                    name="search"
                    value={searchInput}
                    className={"info-border bg-light"}
                    onChange={(event) => { setSearchInput(event.target.value) }}
                  />
                
                  <Button
                    variant="outline-dark"
                    type="button"
                    onClick={() => searchData()}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>

            </div>
                <div className="col-12 allcenter text-center mb-2">
                  <Button
                    type="button"
                    variant="outline-dark"
                    disabled={currentPage === 0 ? true : false}
                    onClick={() => firstPage()}>

                    <FontAwesomeIcon icon={faFastBackward}/>
                  </Button>
                  <Button
                    type="button"
                    variant="outline-dark"
                    disabled={currentPage === 0 ? true : false}
                    onClick={() => prevPage()}>

                    <FontAwesomeIcon icon={faStepBackward}/>
                  </Button>

                  <p>Сторінка {currentPage + 1} з {totalPages + 1}</p>

                                  
                  <Button
                      type="button"
                      variant="outline-dark"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={() => nextPage()}
                    >
                      <FontAwesomeIcon icon={faStepForward} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline-dark"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={() => lastPage()}
                    >
                      <FontAwesomeIcon icon={faFastForward} />
                    </Button>
                </div>
                
          </div>
        </div>
    );
};


export function deleteById(type, id) {
    fetch(BASE_URL + type +"/delete/" + id, {
        method: 'DELETE',
        headers: {
            "Authorization": authHeader(),
            "content-type": "application/json"
        }
    })
        .then((res) =>{
            window.location.reload()
            return res.json;
        });   
}
    
export default AdminPanel;






