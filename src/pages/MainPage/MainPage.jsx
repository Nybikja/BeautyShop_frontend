import ClubshopIntro from '../../components/Item/ClubshopBlocks/ClubshopIntro';
import ClubshopEnd from '../../components/Item/ClubshopBlocks/ClubshopEnd';
import Footer from '../../components/Footer/Footer';

import "./MainPage.scss"
import "../ClubshopPages.scss"





function MainPage() {
    return (
        <>
            <ClubshopIntro 
                introText="Чому купити у нас?"
                introImg="/imgjs/icons/why.png"
                clubImg="welcomescreen club-img"
            />

            <div className="container-fluid">
                <div className="row clubshop-info section-bg">
                    <div className="col-md-5 info-item block-bg">
                        <div className="col-2 info-logo">
                            <img className="" src="/imgjs/icons/delivery.png" alt="" />
                        </div>
                        <div className="col-9 info-text block-text ">
                            <p>Швидка доставка</p>
                        </div>
                    </div>
                    <div className="col-md-5 info-item block-bg">
                        <div className="col-2 info-logo">
                            <img className="" src="/imgjs/icons/hair.png" alt="" />
                        </div>
                        <div className="col-9 info-text block-text ">
                            <p>Індивідуальний підбір догляду</p>
                        </div>
                    </div>
                    <div className="col-md-5 info-item block-bg">
                        <div className="col-2 info-logo">
                            <img className="" src="/imgjs/icons/support.png" alt="" />
                        </div>
                        <div className="col-9 info-text block-text ">
                            <p>Консультація щодо використання</p>
                        </div>
                    </div>
                    <div className="col-md-5 info-item block-bg">
                        <div className="col-2 info-logo">
                            <img className="" src="/imgjs/icons/original.png" alt="" />
                        </div>
                        <div className="col-9 info-text block-text ">
                            <p>Лише оригінальна продукція</p>
                        </div>
                    </div>
                    <div className="col-md-5 info-item block-bg">
                        <div className="col-2 info-logo">
                            <img className="" src="/imgjs/icons/gifts.png" alt="" />
                        </div>
                        <div className="col-9 info-text block-text ">
                            <p>Регулярні знижки і подарунки</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-5">
                <div className="longread section-bg">
                    <div className="col-8-md info-longread block-bg">
                        <div className="info-h block-text allcenter ">
                            <p>Трішки про нас</p>
                            <img className="" src="/imgjs/icons/infoh.png" alt="" />
                        </div>
                        <div className="info-text block-text">
                            <p>
                                Ми - команда професіоналів, яка вже багато років
                                працює з продуктами Davines і 
                                задовільняє потреби найвибагливішого клієнта.
                            </p>
                            <p>
                                Наша ціль - бачити радість клієнтів після процедур.
                                На жаль ми не можемо надати послуги кожній жінці у Львові,
                                тому ми вирішили надавати допомогу з підбором та покупкою
                                Davines.
                            </p>
                            <p>
                                Наша продукція в дійсності важка у підборі, тому 
                                ми рекомендуємо звернутися до консультанта, аби не
                                прогадати з вибором.
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>








            <ClubshopEnd/>
            <Footer></Footer>


         
        
        
        </>
    );
}

export default MainPage;
