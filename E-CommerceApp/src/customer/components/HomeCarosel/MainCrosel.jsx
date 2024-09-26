import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const items = [
    <div className="item h-[255px] bg-green-300" data-value="1">1</div>,
    <div className="item h-[255px] bg-yellow-300" data-value="2">2</div>,
    <div className="item h-[255px] bg-blue-300" data-value="3">3</div>,
    <div className="item h-[255px] bg-gray-300" data-value="4">4</div>,
    <div className="item h-[255px] bg-green-300" data-value="5">5</div>,
];

export const MainCrosel = () => (
    <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
    />
);