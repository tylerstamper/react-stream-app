import key from '../../key';
import Nav from '../../Components/Nav/Nav';
import { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import Modal from '../../Components/Modal/Modal';
import Footer from '../../Components/Footer/Footer';
//styles shared from movies page

function Series(){

    const [comdeyTV, setComedyTV] = useState();
    const [crimeTV, setCrimeTV] = useState();
    const [realityTV, setRealityTV] = useState();
    const [animationTV, setAnimationTV] = useState();
    const [scifiTV, setScifiTV] = useState();
    const [modalData, setModalData] =  useState();
    const [modalShowing, setModalShowing] = useState(false);
    const [modalDataCast, setModalDataCast] = useState();

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
        gatherSeriesComedy();
        gatherSeriesCrime();
        gatherSeriesReality();
        gatherSeriesAnimation();
        gatherSeriesScifi();
        if(modalData){
            getCast();
        }
    }, [])

    const getCast = () => {
        fetch(`https://api.themoviedb.org/3/tv/${modalData.id}/credits?api_key=${key}&language=en-US`)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            setModalDataCast(response);
        })
    }

    const handleClick = (e) => {
        const genre = e.target.getAttribute('from-genre-list');
        if(genre === 'comedy'){
            for(let i = 0; i < comdeyTV.length; i++){
                if(comdeyTV[i].id === parseInt(e.target.id)){
                    setModalData(comdeyTV[i]);
                    setModalShowing(true);
                }
            }
        }
        if(genre === 'crime'){
            for(let i = 0; i < crimeTV.length; i++){
                if(crimeTV[i].id === parseInt(e.target.id)){
                    setModalData(crimeTV[i]);
                    setModalShowing(true);
                }
            }
        }
        if(genre === 'reality'){
            for(let i = 0; i < realityTV.length; i++){
                if(realityTV[i].id === parseInt(e.target.id)){
                    setModalData(realityTV[i]);
                    setModalShowing(true);
                }
            }
        }
        if(genre === 'animation'){
            for(let i = 0; i < animationTV.length; i++){
                if(animationTV[i].id === parseInt(e.target.id)){
                    setModalData(animationTV[i]);
                    setModalShowing(true);
                }
            }
        }
        if(genre === 'scifi'){
            for(let i = 0; i < scifiTV.length; i++){
                if(scifiTV[i].id === parseInt(e.target.id)){
                    setModalData(scifiTV[i]);
                    setModalShowing(true);
                }
            }
        }
    }

    const gatherSeriesComedy = () => {
        if(!comdeyTV){
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=35&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setComedyTV(response.results);
            })
        }
    }

    const gatherSeriesCrime = () => {
        if(!crimeTV){
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=80&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setCrimeTV(response.results);
            })
        }
    }

    const gatherSeriesReality = () => {
        if(!realityTV){
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=10764&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setRealityTV(response.results);
            })
        }
    }

    const gatherSeriesAnimation = () => {
        if(!animationTV){
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=16&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setAnimationTV(response.results);
            })
        }
    }

    const gatherSeriesScifi = () => {
        if(!scifiTV){
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=10765&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setScifiTV(response.results);
            })
        }
    }

    const modalClose = () => {
        setModalShowing(false);
    }

    if(modalShowing){
        document.body.style.overflowY = 'hidden';
    }else{
        document.body.style.overflowY = '';
    }

    return(
        <>
        <main>
            <Nav/>
            <Modal disabledBtn={true} modalData={modalData} castData={modalDataCast} modalShowing={modalShowing} onClick={modalClose}/>
            <h2 className='page-title'>Series</h2>
            <div className='div-container comedy'>
                <h3>COMEDY SERIES</h3>
                <Carousel breakPoints={breakPoints}>
                    {comdeyTV && comdeyTV.map(item => {
                        return <img from-genre-list={'comedy'} onClick={e => handleClick(e)} id={item.id} className='movie-poster' key={item.id} src={'https://image.tmdb.org/t/p/original' + item.poster_path}/>
                    })}
                </Carousel>
                </div>

                <div className='div-container crime'>
                <h3>CRIME SERIES</h3>
                <Carousel breakPoints={breakPoints}>
                    {crimeTV && crimeTV.map(item => {
                        return <img from-genre-list={'crime'} onClick={e => handleClick(e)} id={item.id} className='movie-poster' key={item.id} src={'https://image.tmdb.org/t/p/original' + item.poster_path}/>
                    })}
                </Carousel>
                </div>

                <div className='div-container reality'>
                <h3>REALITY TV</h3>
                <Carousel breakPoints={breakPoints}>
                    {realityTV && realityTV.map(item => {
                        return <img from-genre-list={'reality'} onClick={e => handleClick(e)} id={item.id} className='movie-poster' key={item.id} src={'https://image.tmdb.org/t/p/original' + item.poster_path}/>
                    })}
                </Carousel>
                </div>

                <div className='div-container animation'>
                <h3>ANIMATED SERIES</h3>
                <Carousel breakPoints={breakPoints}>
                    {animationTV && animationTV.map(item => {
                        return <img from-genre-list={'animation'} onClick={e => handleClick(e)} id={item.id} className='movie-poster' key={item.id} src={'https://image.tmdb.org/t/p/original' + item.poster_path}/>
                    })}
                </Carousel>
                </div>

                <div className='div-container scifi'>
                <h3>SCI-FI & FANTASY SERIES</h3>
                <Carousel breakPoints={breakPoints}>
                    {scifiTV && scifiTV.map(item => {
                        return <img from-genre-list={'scifi'} onClick={e => handleClick(e)} id={item.id} className='movie-poster' key={item.id} src={'https://image.tmdb.org/t/p/original' + item.poster_path}/>
                    })}
                </Carousel>
                </div>

                <div className='view-all-btn-container'>
                    <button className='view-all-btn' onClick={e => alert('make pagination function to show page lists of series')}>View All</button>
                </div>
        </main>
        <Footer/>
        </>
    );
}

export default Series;