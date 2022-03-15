import { useEffect } from 'react';
import './SearchResults.css';
import Nav from '../../Components/Nav/Nav';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../Components/Modal/Modal';
import key from '../../key';
import confused from '../../Assets/confused.gif';
import StreamItem from '../../Components/StreamItem/StreamItem';

function SearchResults(){
    const { state } = useLocation();

    const [modalData, setModalData] =  useState();
    const [modalDataCast, setModalDataCast] = useState();
    const [modalShowing, setModalShowing] = useState(false);
    const [event, setEvent] = useState();


    useEffect(() => {
        if(modalData && event){
            getCast(event);
        }
    }, [])

    console.log(state);

    const handleClick = (props) => {
        setModalData(props.itemProps);
        setModalShowing(true);
    }

    const getCast = (e) => {
        let type = e.target.getAttribute('media-type');
        if(type === 'movie'){
            fetch(`https://api.themoviedb.org/3/movie/${modalData.id}/credits?api_key=${key}&language=en-US`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setModalDataCast(response);
            })
        }
        else if(type === 'tv'){
            fetch(`https://api.themoviedb.org/3/tv/${modalData.id}/credits?api_key=${key}&language=en-US`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setModalDataCast(response);
            })
        }
        else{
            fetch(`https://api.themoviedb.org/3/person/${modalData.id}/credits?api_key=${key}&language=en-US`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setModalDataCast(response);
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
            <Nav />
            <Modal disabledBtn={false} modalData={modalData} castData={modalDataCast} modalShowing={modalShowing} onClick={modalClose}/>
            <main>
                <h1 style={{color: 'white', textAlign: 'center'}}>Search Page</h1>
                {state.response.length === 0 ?
                    <div className='search-results-none'>
                        <h2>Sorry.. We couldnt find <span style={{fontStyle: 'italic', textDecoration: 'underline', fontSize: '0.9em', fontWeight: '500'}}>{state.query}</span></h2>
                        <img alt='confused gif' src={confused}/>
                    </div>
                    :
                    <div className='grid-div-results'>
                        {state.response.map((item, index) => <StreamItem key={index} onClick={(props) => handleClick(props)} itemProps={item} />)}
                    </div>}
            </main>
        </>
    );
}
export default SearchResults;