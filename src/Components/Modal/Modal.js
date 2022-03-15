import { useEffect, useState } from 'react';
import key from '../../key';
import './Modal.css';
import ActorCard from '../ActorCard/ActorCard';
import arrow from '../../Assets/arrow.png';

function Modal(props){

    const [link, setLink] = useState();
    const [castShowing, setCastShowing] = useState(false);

    useEffect(() => {
        if(props.modalData){
            console.log(props);
        }else{
            return;
        }
    }, [props.modalData])

    const handleClick = () => {
        props.onClick();
    }

    const fetchLink = () => {
        fetch(`https://api.themoviedb.org/3/movie/${props.modalData.id}/videos?api_key=${key}&language=en-US`)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            for(let i= 0; i < response.results.length; i++){
                if(response.results[i].name === 'Official Trailer'){
                    console.log(response.results[i].key);
                    setLink('https://www.youtube.com/watch?v=' + response.results[i].key);
                }
            }
        })
    }

    // list create functions for modal -- must setup authentication --
    // const addToList = async() => {
    //     console.log(props.modalData.id);
    //     await fetch(`https://api.themoviedb.org/3/account/1/watchlist?api_key=${key}`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify({
    //             "media_type": props.modalData.media_type,
    //             "media_id": props.modalData.id,
    //             "watchlist": true
    //           })
    //     })
    //     getList();
    // }

    // const getList = () => {
    //     fetch(`https://api.themoviedb.org/3/account/1/watchlist/movies?api_key=${key}&language=en-US&sort_by=created_at.asc&page=1`)
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(response){
    //         console.log(response);
    //     })
    // }

    const movieOrSeries = () => {
        if('original_title' in props.modalData){
            return props.modalData.original_title;
        }else if('original_name' in props.modalData){
            return props.modalData.original_name;
        }
    }

    const toggleCast = () => {
        if(!castShowing){
            setCastShowing(true);
        }
        else{
            setCastShowing(false);
        }
    }

    return(
        <div style={props.modalShowing ? {display: 'block'} : {display: 'none'}} className='modal'>
            <div className='modal-content' style={castShowing ? {height: '90%', overflowY: 'scroll'} : {}}>
                <h2 className='modal-data-title'>{props.modalData && movieOrSeries()}</h2>
                <button className='closeBtn' onClick={handleClick}>X</button>
                <img src={props.modalData && 'https://image.tmdb.org/t/p/original' + props.modalData.backdrop_path}/>
                { props.disabledBtn ? <></> : <a className='trailerBtn' href={link && link} target='_blank'>Trailer</a>}
                <button className='watchBtn'>Watch Now</button>
                <button className='addToList' onClick={() => alert('this should call addToList() when auth is ready')} >Add to Watchlist</button>
                <p className='modal-data-overview'>{props.modalData && props.modalData.overview}</p>
                <div className='modal-extra-details'>
                    <p>Average Rating: {props.modalData && props.modalData.vote_average}/10</p>
                    <p>{props.modalData && props.modalData.release_date}</p>
                </div>
                <div className='cast-btn-div'>
                    <button className='cast-btn' onClick={() => toggleCast()}>CAST MEMBERS</button>
                    <img className='arrow' style={castShowing ? {transform: 'rotate(90deg)'} : {}} src={arrow}/>
                </div>
                <div className='cast-wrapper' style={castShowing? {} : {maxHeight: '0', padding: '0', opacity: '0'}}>
                    {props.castData && props.castData.cast.map(member => 
                        <ActorCard key={member.id} data={member}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;