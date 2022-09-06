import ClubshopIntro from '../../components/Item/ClubshopBlocks/ClubshopIntro';
import ClubshopEnd from '../../components/Item/ClubshopBlocks/ClubshopEnd';

import "./DavinesPage.scss"
import "../ClubshopPages.scss"


function DavinesPage() {
  return (
    <>
      <ClubshopIntro 
              introText="Що таке Davines?"
              introImg="/imgjs/icons/davines.png"
              clubImg="welcomescreen davines-img" />
      <div className="container-fluid">
        <div className="row clubshop-info section-bg">
          <div className="col-md-8 davines-item block-bg">
              <div className="col-12 davines-logo">
                  <img className="" src="/imgjs/davines/image1.jpg" alt="" />
              </div>
              <div className="col-12 davines-text block-text ">
                <p>Davines - привіт із сонячного Середземномор'я: аромат рослин, зібраних у підніжжя Апеннінських гір, легкість морського бризу, яскравість південної природи.</p>
                <p>Davines - професійна косметика найвищого класу родом із Італії.</p>
                <p>Davines - науковий підхід до створення нових продуктів та використання натуральних компонентів.</p>
                <p>Davines - символ вишуканого стилю, який підкреслює Вашу неповторність.</p>
              </div>
          </div>
          <div className="col-md-8 davines-item block-bg">
              <div className="col-12 davines-logo">
                  <img className="" src="/imgjs/davines/image2.jpg" alt="" />
              </div>
              <div className="col-12 davines-text block-text ">
                <p>Ідеал краси Davines – рівновага та простота. 
                  <br></br> Простота щоденного буття, неповторності кожної миті, 
                  емоцій, можливості творити. 
                </p>
                <p>Стиль життя Davines – усвідомлювати кожний момент буття, бути в гармонії зі своїм настроєм, відчувати своє значення, постійно змінюватися.</p>
                <p>Продукти Davines – вираз високої самооцінки, самоповаги до того, хто цією продукцією користується.</p>
              </div>
          </div>
        </div>
      </div>
      <ClubshopEnd/>
    </>
  );
}





export default DavinesPage;
