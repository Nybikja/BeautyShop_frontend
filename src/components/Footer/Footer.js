import './Footer.scss';


function Footer() {
  return (
    <div className='footer container-fluid text-dark'>
      <div className="col-12 footer-icons allbetween mx-auto"> 
      <a href="https://www.instagram.com/clubshoplviv" target="_blank" role="button" rel="noreferrer">
          <img src="/imgjs/icons/instagram.svg" alt="" />
        </a>
        <a href="https://t.me/https://t.me/beautyclubshop" target="_blank" role="button" rel="noreferrer">
          <img src="/imgjs/icons/telegram.svg" alt="" />
        </a>
        <a href="tel:+380684771771" target="_blank" role="button" rel="noreferrer">
          <img src="/imgjs/icons/phone.svg" alt="" />
        </a>
        <a href="viber://add?number=380684771771" target="_blank" role="button" rel="noreferrer">
          <img src="/imgjs/icons/viber.svg" alt="" />
        </a>
        <a href="https://api.whatsapp.com/send?phone=380684771771" target="_blank" role="button" rel="noreferrer">
          <img src="/imgjs/icons/whatsup.svg" alt="" />
        </a>
      </div>
       <div className="col-12 text-center contact">
         <h3>Контакти</h3>
         <a href="https://goo.gl/maps/qDuHgiwSY9W2MsTt8" target="_blank" role="button" rel="noreferrer">
          <img src="/imgjs/icons/house.svg" alt="" />
          м. Львів, с. Сокільники, вул. Весняна 6
        </a>
      
      </div>
      <div className="col-12 mx-auto text-center p-3 copyright">
        <a className="" href="https://beautyclub.center/">© 2022 Copyright: ClubShop</a>
      </div>
      
    </div>
  );
}

export default Footer;
