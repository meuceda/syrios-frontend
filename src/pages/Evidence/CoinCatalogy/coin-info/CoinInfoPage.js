import React from 'react';
import { useParams } from "react-router-dom";
import useFetch from 'src/hooks/useFetch';
import "./CoinInfoPage.scss"
import { Link } from 'react-router-dom';
import qs from 'qs';
import CoinScaleAndFlip from './CoinAnimations';

function CoinInfoPage (){
    const id = useParams().id;

    let query = qs.stringify({
        populate: [
            'obverse_image','reverse_image','denomination',
            'ancient_territory',
            'mint.modern_name',
            'mint.modern_country',
            'governing_power',
            'issuing_authority',
            'material',
            'language'
        ],
    })
    const { data, 
    } = useFetch(`/coin-collections/${id}?${query}`);

    return(
        <div id='CoinInfoPage'>
            <div className='section1'>
                <div className='title'>
                    {data?.attributes?.issuing_authority?.data?.attributes?.issuing_authority} {data?.attributes?.mint?.data?.attributes?.mint} {data?.attributes?.material?.data?.attributes?.material}
                </div>
                <div className='year'>
                    {data?.attributes?.from_year < 0 ? <>{String(data?.attributes?.from_year).substring(1)} BCE</>:<>{data?.attributes?.from_year} CE</>} - {data?.attributes?.to_year < 0 ? <>{String(data?.attributes?.to_year).substring(1)} BCE</>:<>{data?.attributes?.to_year} CE</>}
                </div>
                <div className='basic-info'>
                    <div className='item'>
                        <h1>OBVERSE TYPE:</h1>
                        <h2>{data?.attributes?.obverse_type?.length === 0 ? "None" :data?.attributes?.obverse_type}</h2>
                    </div>
                    <div className='item'>
                        <h1>OBVERSE LEGEND:</h1>
                        <h2>{data?.attributes?.obverse_legend?.length === 0 ? "None" :data?.attributes?.obverse_legend}</h2>
                    </div>
                    <div className='item'>
                        <h1>REVERSE TYPE:</h1>
                        <h2>{data?.attributes?.reverse_type?.length === 0 ? "None" :data?.attributes?.reverse_type}</h2>
                    </div>
                    <div className='item'>
                        <h1 >REVERSE LEGEND:</h1>
                        <h2>{data?.attributes?.reverse_legend?.length === 0 ? "None" :data?.attributes?.reverse_legend}</h2>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='section2'>
                <div className='left'>
                    <CoinScaleAndFlip obverseImg = {data?.attributes?.obverse_image} reverseImg = {data?.attributes?.reverse_image} diameter = {data?.attributes?.diameter}/>
                    {/* <img
                        className='CoinImg'
                        src={ process.env.REACT_APP_UPLOAD_URL + data?.attributes?.obverse_image?.data?.attributes?.url}
                        alt=""
                    /> */}
                </div>
                <div className='right'>
                    <div className='item'>
                        <h1>Ancient Territory:</h1>
                        <p>{data?.attributes?.ancient_territory?.data?.attributes?.ancient_territory.length === 0 ? "None" :data?.attributes?.ancient_territory?.data?.attributes?.ancient_territory}</p>
                    </div>
                    <div className='item'>
                        <h1>Modern Country:</h1>
                        <p></p>
                        <p>{data?.attributes?.mint?.data?.attributes?.modern_country?.data?.attributes?.modern_country.length === 0 ? "None" :data?.attributes?.mint?.data?.attributes?.modern_country?.data?.attributes?.modern_country}</p>
                    </div>
                    <div className='item'>
                        <h1>Mint:</h1>
                        <p>{data?.attributes?.mint?.data?.attributes?.mint.length === 0 ? "None" :data?.attributes?.mint?.data?.attributes?.mint}</p>
                    </div>
                    <div className='item'>
                        <h1>Modern Name:</h1>
                        <p></p>
                        <p>{data?.attributes?.mint?.data?.attributes?.modern_name?.data?.attributes?.modern_name.length === 0 ? "None" :data?.attributes?.mint?.data?.attributes?.modern_name?.data?.attributes?.modern_name}</p>
                    </div>
                    <div className='item'>
                        <h1>Governing Power:</h1>
                        <p>{data?.attributes?.governing_power?.data?.attributes?.governing_power.length === 0 ? "None" :data?.attributes?.governing_power?.data?.attributes?.governing_power}</p>
                        </div>
                    <div className='item'>
                        <h1>Issuing Authority:</h1>
                        <p>{data?.attributes?.issuing_authority?.data?.attributes?.issuing_authority.length === 0 ? "None" :data?.attributes?.issuing_authority?.data?.attributes?.issuing_authority}</p>
                    </div>
                    <div className='item'>
                        <h1>Material:</h1>
                        <p>{data?.attributes?.material?.data?.attributes?.material.length === 0 ? "None" :data?.attributes?.material?.data?.attributes?.material}</p>
                    </div>
                    <div className='item'>
                        <h1>Denomination:</h1>
                        <p>{data?.attributes?.denomination?.data?.attributes?.denomination.length === 0 ? "None" :data?.attributes?.denomination?.data?.attributes?.denomination}</p>
                    </div>
                    <div className='item'>
                        <h1>Language:</h1>
                        <p>{data?.attributes?.language?.data?.attributes?.language.length === 0 ? "None" :data?.attributes?.language?.data?.attributes?.language}</p>
                    </div>
                    <div className='item'>
                        <h1>Cool Factor:</h1>
                        <p></p>
                    </div>
                </div>
            </div>
            <div className='section2-bottom'>
                <div className='item'>
                    Source Image: {data?.attributes?.souce_image}
                </div>
                <div className='item'>
                    Rights holder: {data?.attributes?.right_holder}
                </div>
                <div className='item'>
                    Bibliography: {data?.attributes?.reference}
                </div>
                <div className='backbutton' style={{textAlign:"center"}}>
                    <Link className='BackButton' to={`/Evidence/CoinCatalogDev`}>
                        View full catalog
                    </Link>
                </div>

            </div>
            <div className='section3'></div>
            <div className='section4'></div>
        </div>
    )
}

export default CoinInfoPage
