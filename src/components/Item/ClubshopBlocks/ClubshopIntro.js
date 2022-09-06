function ClubshopIntro({introText, introImg, clubImg }) {
    return (
        <section>
                <div className="clubshop-intro allcenter">
                    <div className="intro-text allcenter">
                        <p>{introText}</p>
                        <img className="" src={introImg} alt="" />
                    </div>
                    <img className="angels-down" src="/imgjs/icons/down.gif" alt="" />
                    <div className={clubImg} ></div>
                </div>
            </section>
    );
}

export default ClubshopIntro;
