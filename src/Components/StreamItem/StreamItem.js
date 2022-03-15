import { useEffect } from 'react';
import './StreamItem.css';

function StreamItem(props) {

    useEffect(() => {
    }, [])

    const handleClick = () => {
        props.onClick(props);
    }

    return <img src={`https://image.tmdb.org/t/p/original${props.itemProps.poster_path}`} className='movie-poster' id={props.itemProps.id} key={props.itemProps.id} onClick={() => handleClick()}/>
}
export default StreamItem;