import React from "react";
import axios from 'axios';

import Item from "../../components/Item/Item"
import { Dropdown, Button } from "react-bootstrap";
import "./ShoppingPage.scss"
import { BASE_URL } from "../../service/config/ApiConfig";
import { fakeItem, searchTypes } from "./NavTV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";


function ShoppingPage(props) {
    const { onAdd } = props;
    const [isLoading, setIsLoading] = React.useState(true)

    const [navTittle, setNavTittle] = React.useState("Весь асортимент");
    const [navSubTittle, setNavSubTittle] = React.useState();
    
    const [values, setValues] = React.useState([]);

    const [searchValue,setSearchValue] = React.useState([]);
    const [showTabAll, setShowTabAlls] = React.useState(false);

    const [items, setItems] = React.useState([]);
    const [productsPerPage] = React.useState(12);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState();
    const [totalElements, setTotalElements] = React.useState();


    const search = (searchType, searchValue) => {
        setShowTabAlls(true);

        axios.get(BASE_URL + "products/" + searchType + "?name=" + searchValue + "&page=" + currentPage + "&size=" + productsPerPage).then(res => {
            setShowTabAlls(true)
            // setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setItems(res.data.content);
                setTotalElements(res.data.totalElements);
                setTotalPages(res.data.totalPages - 1);
                setCurrentPage(res.data.number);
            // }, "1000")
            setIsLoading(false);
        });
    };

    React.useEffect(() => {
        setIsLoading(true)
        // setTimeout(() => {
            findAllProducts(currentPage);
        //   }, "1000")
        getValues("productTypes");
    }, []);

    function getValues(type) {
        axios.get(BASE_URL + type).then(res => {
            setSearchValue(res.data)
        });
    }

    const findAllProducts = (currentPage) => {
        axios.get(BASE_URL + "products?page=" + currentPage + "&size=" + productsPerPage).then(res => {
            setCurrentPage(currentPage - 1);
            setItems(res.data.content);
            setTotalElements(res.data.totalElements);
            setTotalPages(res.data.totalPages - 1);
            setCurrentPage(res.data.number);
        });
        setIsLoading(false);
        setShowTabAlls(false)
    }

    const firstPage= () => {
        let firstPage = 0;

        if (currentPage > firstPage) {
            findAllProducts(firstPage);
        }
    };

    const prevPage= () => {
        let prevPage = 0;
        console.log("prevpage");

        if (currentPage > prevPage) {
            console.log(currentPage);
            findAllProducts(currentPage - 1 - prevPage);
        }
    };

    const lastPage= () => {
        let condition = Math.ceil(totalElements / productsPerPage);

        if (currentPage < condition) {
            findAllProducts(condition - 1);
        }
    };

    const nextPage= () => {
        if (currentPage < Math.ceil(totalElements / productsPerPage)) {
            findAllProducts(currentPage + 1);
        }
    };

    const renderItems = () => {
        return(isLoading ? fakeItem : items).map((item) => (

        <Item
            key={item.id}
            onAdd={onAdd}
            loading={isLoading}
            product={item}></Item>
    ));
    };

    const renderNavAll = () => {
        return(
            <Dropdown drop="end">
                <Dropdown.Toggle  onClick={()=> {setNavTittle("Весь асортимент"); setNavSubTittle(null);findAllProducts();}} variant="dark" id="all" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="true">
                    Весь асортимент
                </Dropdown.Toggle>
                <Dropdown.Menu className="d-none"></Dropdown.Menu>  
            </Dropdown> 
        )
    }


    return (
        <div className="shop">
            <div className="heading d-flex justify-between">
                <Dropdown>
                    <Dropdown.Toggle variant="light"  id="shoppingNav" data-bs-auto-close="true" >
                        {navTittle} / {navSubTittle === undefined ? null : navSubTittle }
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu  aria-labelledby="shoppingNav">
                    {showTabAll===true ? renderNavAll(): null}
                    
                        {
                            searchTypes.map((searchType) =>(                          
                            <div key={searchType.id}><Dropdown  drop="end">
                                    <div 
                                        onClick={() => 
                                                {setNavTittle(searchType.Name);
                                                setNavSubTittle(null);
                                                getValues(searchType.getSearchValue);}}>
                                        <Dropdown.Toggle  type="button" data-bs-toggle="dropdown">
                                            {searchType.Name}
                                        </Dropdown.Toggle>
                                    </div>
                                    <Dropdown.Menu  className={"dropdown-menu sort-items"}>
                                        {searchValue.map((searchValue, index) =>
                                            (<Dropdown.Item key={index}
                                                onClick={() =>{ search(searchType.searchType, searchValue.englishName);
                                                                setNavSubTittle(searchValue.name);
                                                                }}
                                            >
                                                {searchValue.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown></div> 
                            ))
                        }
                    </Dropdown.Menu>           
                </Dropdown>
            </div>

            <div className="list d-flex flex-wrap">     
                {renderItems()}
            </div>
            <div className="row pagination">
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
}

export default ShoppingPage;
