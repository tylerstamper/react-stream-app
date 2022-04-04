import './AllSeries.css';
import Nav from '../../Components/Nav/Nav';
import key from '../../key';
import { useEffect, useState, useRef } from 'react';
import Modal from '../../Components/Modal/Modal';
import Footer from '../../Components/Footer/Footer';
import StreamItem from '../../Components/StreamItem/StreamItem';

function AllSeries(){

    const [count, setCount] = useState(1);
    const [seriesData, setSeriesData] = useState();
    const [loading, setLoading] = useState(true);

    //modal
    const [modalShowing, setModalShowing] = useState(false);
    const [modalData, setModalData] = useState();
    const [modalDataCast, setModalDataCast] = useState();

    useEffect(() => {
        getSeriesList();
    }, [count])

    const modalClose = () => {
        setModalShowing(false);
    }

    if(modalShowing){
        document.body.style.overflowY = 'hidden';
    }else{
        document.body.style.overflowY = '';
    }

    const getSeriesList = async() => {
        if(!seriesData){
            await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${count}&with_watch_monetization_types=flatrate`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setSeriesData(response.results);
                setLoading(false);
            })
        } else if(seriesData){
            await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${count}&with_watch_monetization_types=flatrate`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                let dataCopy = seriesData;
                let allData = dataCopy.concat(response.results);
                setSeriesData(allData);
                setLoading(false);
            })
        }
    }

    const handleClick = (props) => {
        setModalData(props.itemProps);
        getCast(props.itemProps);
        setModalShowing(true);
    }

    const getCast = (props) => {
        fetch(`https://api.themoviedb.org/3/tv/${props.id}/credits?api_key=${key}&language=en-US`)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            setModalDataCast(response);
        })
    }

    return(
        <>
        <main className='all-movies'>
            <Nav/>
            <Modal disabledBtn={false} modalData={modalData} castData={modalDataCast} modalShowing={modalShowing} onClick={modalClose}/>
            <h2 style={{color: 'white'}}>All Movies</h2>

            {loading ? <p style={{color: 'white'}}>Loading...</p> : <><div className='all-movies-grid'>
                {seriesData && seriesData.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item}/>)}
            </div>

            <div className='all-movies-btn-container'>
                <button className='show-more-btn' onClick={e => handleClick(e)}>Show More</button>
            </div></>}
        
        </main>
        <Footer />
        </>
    );
}
export default AllSeries;