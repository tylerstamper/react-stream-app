import { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import Nav from '../../Components/Nav/Nav';
import './Home.css';
import Footer from '../../Components/Footer/Footer';
import Modal from '../../Components/Modal/Modal';
import key from '../../key';
import StreamItem from '../../Components/StreamItem/StreamItem';

export default function Home() {

    const [data, setData] = useState();

    //modal
    const [modalData, setModalData] =  useState();
    const [modalDataCast, setModalDataCast] = useState();
    const [modalShowing, setModalShowing] = useState(false);
    const [num1trending, setNum1Trending] = useState();
    const [trending, setTrending] = useState();

    const breakPoints = [
        { width: 1, itemsToShow: 3, itemsToScroll: 3 },
        { width: 560, itemsToShow: 4, itemsToScroll: 4 },
        { width: 740, itemsToShow: 5, itemsToScroll: 4 },
        { width: 840, itemsToShow: 6, itemsToScroll: 5 },
        { width: 1000, itemsToShow: 7, itemsToScroll: 3 },
        { width: 1300, itemsToShow: 8, itemsToScroll: 3 },
        { width: 1600, itemsToShow: 9, itemsToScroll: 2 }
    ];

    useEffect(() => {
        getPageData();
        if(modalData){
            getCast();
        }
    }, [modalData, data])

    const getPageData = () => {
        if(!data){
            fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                dataDistributor(response);
            })
        }
    }

    const dataDistributor = (response) => {
        setNum1Trending(response.results[0]);
        setTrending(response.results);
    }

    const handleClick = (props) => {
        setModalData(props.itemProps);
        setModalShowing(true);
    }

    const getCast = () => {
        let type = modalData.media_type;
        fetch(`https://api.themoviedb.org/3/${type}/${modalData.id}/credits?api_key=${key}&language=en-US`)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            setModalDataCast(response);
        })
    }

    const modalClose = () => {
        setModalShowing(false);
    }

    if(modalShowing){
        document.body.style.overflowY = 'hidden';
    }else{
        document.body.style.overflowY = '';
    }
    return (
        <>
        <Nav/>
        <main>

        <div className='num-one-trending'>
            <h3>#1 Trending today</h3>
            <img src={`https://image.tmdb.org/t/p/original${num1trending && num1trending.backdrop_path}`}/>
            <p>{num1trending && num1trending.original_title}</p>
        </div>

        <Modal disabledBtn={false} modalData={modalData} castData={modalDataCast} modalShowing={modalShowing} onClick={modalClose}/>
                <h2 className='page-title'>MOVIES</h2>
                    <div className='div-container action' id='action'>
                        <h3>ACTION MOVIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {trending && trending.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                    </Carousel>
                    </div>

                    <div className='div-container action' id='action'>
                        <h3>ACTION MOVIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {trending && trending.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                    </Carousel>
                    </div>

                    <div className='div-container action' id='action'>
                        <h3>ACTION MOVIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {trending && trending.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                    </Carousel>
                    </div>

                    <div className='div-container action' id='action'>
                        <h3>ACTION MOVIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {trending && trending.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                    </Carousel>
                    </div>

                    <div className='div-container action' id='action'>
                        <h3>ACTION MOVIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {trending && trending.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                    </Carousel>
                    </div>
        </main>
        <Footer />
        </>
    );
}