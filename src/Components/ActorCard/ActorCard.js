import { useEffect } from 'react';
import './ActorCard.css';
import placeholderAvatar from '../../Assets/default.png';

function ActorCard(props){


    return(
        <div className='card-div'>
            {!props.data.profile_path ? <img src={placeholderAvatar}/> : <img src={`https://image.tmdb.org/t/p/original${props.data.profile_path}`}/>}
            <div className='p-div' id='actor-name'>
                {props.data.name.split(' ').map(name => <p key={name}>{name}</p>)}
            </div>
        </div>
    );
}
export default ActorCard;