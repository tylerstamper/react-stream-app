import { useEffect, useState } from 'react';
import './StreamItem.css';

function StreamItem(props) {


    useEffect(() => {
    }, [])

    const handleClick = () => {
        props.onClick(props);
    }

    return ( !props.itemProps.poster_path && !props.itemProps.origianl_title &&  !props.itemProps.original_name ? <></> :
    props.itemProps.poster_path ?
    <img src={`https://image.tmdb.org/t/p/original${props.itemProps.poster_path}`} className='movie-poster' id={props.itemProps.id} key={props.itemProps.id} onClick={() => handleClick()}/>
    :
    <div className='no-poster-div'>
    {props.itemProps.origianl_title ?
    props.itemProps.origianl_title
    :
    props.itemProps.original_name}
    </div>
    );
}
export default StreamItem;