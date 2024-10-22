import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Ex_MainCroselPhot } from '../../../data/HomeCaroselPhoto/Ex_MainCroselPhoto';


const items = [
    <div className="item h-[520px] overflow-hidden bg-green-300" data-value="1">
        <img src={Ex_MainCroselPhot.Banner1} alt="" />
    </div>,
    <div className="item h-[520px] overflow-hidden bg-green-300" data-value="1">
        <img src={Ex_MainCroselPhot.Banner2} alt="" />
    </div>,
    <div className="item h-[520px] overflow-hidden bg-green-300" data-value="1">
        <img src={Ex_MainCroselPhot.Banner3} alt="" />
    </div>,
    <div className="item h-[520px] overflow-hidden bg-green-300" data-value="1">
        <img src={Ex_MainCroselPhot.Banner4} alt="" />
    </div>,
];

export const MainCrosel = () => (
    <div className='mt-2'>
        <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1500}
        infinite
    />
    </div>
);