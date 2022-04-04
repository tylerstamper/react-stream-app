import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import Nav from '../../Components/Nav/Nav';
import './Home.css';
import Footer from '../../Components/Footer/Footer';
import Modal from '../../Components/Modal/Modal';
import key from '../../key';
import StreamItem from '../../Components/StreamItem/StreamItem';

export default function Home() {

    const [num1trending, setNum1Trending] = useState();
    const [trendingMovies, setTrendingMovies] = useState();
    const [topRatedMovies, setTopRatedMovies] = useState();
    const [trendingTV, setTrendingTV] = useState();
    const [topRatedTV, setTopRatedTV] = useState();
    const [myList, setMyList] = useState();
    const navigate = useNavigate();


    //modal
    const [modalData, setModalData] =  useState();
    const [modalDataCast, setModalDataCast] = useState();
    const [modalShowing, setModalShowing] = useState(false);

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
    }, [modalData])

    const getPageData = () => {
        getTrendingMovies();
        getTrendingTV();
        getTopRatedMovies();
        getTopRatedTV();
    }

    const getTrendingMovies = () => {
        if(!trendingMovies){
            fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                distributeTrendingMovies(response);
            })
        }
    }

    const getTrendingTV = () => {
        if(!trendingTV){
            fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${key}`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setTrendingTV(response.results);
            })
        }
    }

    const getTopRatedMovies = () => {
        if(!topRatedMovies){
            fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&langauge=en-US&page=1`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setTopRatedMovies(response.results);
            })
        }
    }

    const getTopRatedTV = () => {
        if(!topRatedTV){
            fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&langauge=en-US&page=1`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setTopRatedTV(response.results);
            })
        }
    }

    const distributeTrendingMovies = (response) => {
        setNum1Trending(response.results[0]);
        setTrendingMovies(response.results);
    }

    const handleClick = (props, mediaType) => {
        setModalData(props.itemProps);
        getCast(props.itemProps, mediaType);
        setModalShowing(true);
    }

    const getCast = (props, mediaType) => {
        fetch(`https://api.themoviedb.org/3/${mediaType}/${props.id}/credits?api_key=${key}&language=en-US`)
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
                    <div className='div-container action' id='my-list'>
                        <h3>My List</h3>
                    {myList ? 
                        <Carousel breakPoints={breakPoints}>
                            {myList && myList.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                        </Carousel>
                    :
                        <div className='empty-list'>
                            <h4>Your List is Empty</h4>
                        </div>}
                    </div>

                    <div className='div-container action' id='trending-movies'>
                        <h3>TRENDING MOVIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {trendingMovies && trendingMovies.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props, 'movie')} itemProps={item} />)}
                    </Carousel>
                    </div>

                    <div className='div-container action' id='trending-series'>
                        <h3>TRENDING SERIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {trendingTV && trendingTV.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props, 'tv')} itemProps={item} />)}
                    </Carousel>
                    </div>

                    <div className='div-container action' id='top-rated-movies'>
                        <h3>TOP RATED MOVIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {topRatedMovies && topRatedMovies.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props, 'movie')} itemProps={item} />)}
                    </Carousel>
                    </div>

                    <div className='div-container action' id='top-rated-tv'>
                        <h3>TOP RATED SERIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {topRatedTV && topRatedTV.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props, 'tv')} itemProps={item} />)}
                    </Carousel>
                    </div>
        </main>
        <Footer />
        </>
    );
}