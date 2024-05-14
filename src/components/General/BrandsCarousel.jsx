import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import React from "react"; 
// import Icons from "../Icons"

function BrandsCarousel() {
    return (
        <div>
            <div className="brands-top">
                <div className="brands-text">
                    <span>Dünya brendlərinin Azərbaycandakı rəsmi distribütoru</span>
                </div>
            </div>

            <div className="brands-slider-top">
            <Carousel
                slidesPerPage={8}
                infinite   
                //arrowLeft= {<Icons type="left-arrow" className="icon-example" />}
                //arrowRight={<Icons type="right-arrow" className="icon-example" />}
                addArrowClickHandler
                keepDirectionWhenDragging
                autoPlay={3000}
                breakpoints={{
                    1400: {
                        slidesPerPage: 6,
                    },
                    768: {
                        slidesPerPage: 4,
                    },
                    600: {
                        slidesPerPage: 3,
                    },
                    400: {
                        slidesPerPage: 2,
                    },
                    300: {
                        slidesPerPage: 1,
                    },
                }}>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                             <img className="brand-radius2"
                                  alt="miras-logo"
                                  src={"https://cdn.santral.az//src/brands/miras.svg" }/>
                        </div>
                    </div>
                </div>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                            <img className="brand-radius2"
                                 alt="miras-logo"
                                 src={"https://cdn.santral.az//src/brands/alpina.png" }/>
                        </div>
                    </div>
                </div>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                            <img className="brand-radius2"
                                 alt="miras-logo"
                                 src={"https://cdn.santral.az//src/brands/fumagalli.png" }/>
                        </div>
                    </div>
                </div>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                            <img className="brand-radius2"
                                 alt="miras-logo"
                                 src={"https://cdn.santral.az//src/brands/gewiss.png" }/>
                        </div>
                    </div>
                </div>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                            <img className="brand-radius2"
                                 alt="miras-logo"
                                 src={"https://cdn.santral.az//src/brands/gold.png" }/>
                        </div>
                    </div>
                </div>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                            <img className="brand-radius2"
                                 alt="miras-logo"
                                 src={"https://cdn.santral.az//src/brands/ider.png" }/>
                        </div>
                    </div>
                </div>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                            <img className="brand-radius2"
                                 alt="miras-logo"
                                 src={"https://cdn.santral.az//src/brands/mantra.png" }/>
                        </div>
                    </div>
                </div>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                            <img className="brand-radius2"
                                 alt="miras-logo"
                                 src={"https://cdn.santral.az//src/brands/panasonic.svg" }/>
                        </div>
                    </div>
                </div>

                <div className="brands-slider">
                    <div className="inner2">
                        <div className="brands-slider-img">
                            <img className="brand-radius2"
                                 alt="miras-logo"
                                 src={"https://cdn.santral.az//src/brands/saltanat.png" }/>
                        </div>
                    </div>
                </div>

            </Carousel>
            </div>
        </div>
    );
}

export default BrandsCarousel;
