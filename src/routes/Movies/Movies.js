import './Movies.css';
import key from '../../key';
import { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import Nav from '../../Components/Nav/Nav';
import Modal from '../../Components/Modal/Modal';
import Footer from '../../Components/Footer/Footer';
import StreamItem from '../../Components/StreamItem/StreamItem';
import { Link } from 'react-router-dom';

export default function Movies(){
    const [actionMovies,  setActionMovies] = useState();
    const [adventureMovies, setAdventureMovies] = useState();
    const [comedyMovies, setComedyMovies] = useState();
    const [thrillerMovies, setThrillerMovies] = useState();
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
        gatherMovieListAction();
        gatherMovieListAdventure();
        gatherMovieListComedy();
        gatherMovieListAThriller();
        if(modalData){
            getCast();
        }
    }, [modalData])

    const gatherMovieListAction = () => {
        if(!actionMovies){
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=28&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setActionMovies(response.results);
            })
        }else{
            return;
        }
    }

    const gatherMovieListAdventure = () => {
        if(!adventureMovies){
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=12&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setAdventureMovies(response.results);
            })
        }else{
            return;
        }
    }

    const gatherMovieListComedy = () => {
        if(!comedyMovies){
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=35&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setComedyMovies(response.results);
            })
        }else{
            return;
        }
    }
    
    const gatherMovieListAThriller = () => {
        if(!thrillerMovies){
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&with_genres=53&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setThrillerMovies(response.results);
            })
        }else{
            return;
        }
    } 

    const handleClick = (props) => {
        setModalData(props.itemProps);
        setModalShowing(true);
    }

    const getCast = () => {
        fetch(`https://api.themoviedb.org/3/movie/${modalData.id}/credits?api_key=${key}&language=en-US`)
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

    return(
            <>
                <main>
                <Nav/>
                <Modal disabledBtn={false} modalData={modalData} castData={modalDataCast} modalShowing={modalShowing} onClick={modalClose}/>
                <h2 className='page-title'>MOVIES</h2>
                    <div className='div-container action' id='action'>
                        <h3>ACTION MOVIES</h3>
                    <Carousel breakPoints={breakPoints}>
                        {actionMovies && actionMovies.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                    </Carousel>
                    </div>

                    <div className='div-container adventure' id='adventure'>
                        <h3>ADVENTURE MOVIES</h3>
                        <Carousel breakPoints={breakPoints}>
                            {adventureMovies && adventureMovies.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                        </Carousel>
                    </div>

                    <div className='div-container comedy' id='comedies'>
                        <h3>COMEDIES</h3>
                        <Carousel breakPoints={breakPoints}>
                            {comedyMovies && comedyMovies.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                        </Carousel>
                    </div>

                    <div className='div-container thriller' id='thrillers'>
                        <h3>THRILLERS</h3>
                        <Carousel breakPoints={breakPoints}>
                            {thrillerMovies && thrillerMovies.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                        </Carousel>
                    </div>

                    <div className='view-all-btn-container'>
                        <Link className='view-all-btn' to='/movies-all'>All Movies</Link>
                    </div>
                </main>
                <Footer/>
            </>
    );
}
