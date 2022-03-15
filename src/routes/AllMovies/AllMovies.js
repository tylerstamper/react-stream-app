import './AllMovies.css';
import Nav from '../../Components/Nav/Nav';
import key from '../../key';
import { useEffect, useState, useRef } from 'react';
import Modal from '../../Components/Modal/Modal';

function AllMovies(){

    const [count, setCount] = useState(1);
    const [movieData, setMovieData] = useState();
    const [loading, setLoading] = useState(true);

    //modal
    const [modalShowing, setModalShowing] = useState(false);
    const [modalData, setModalData] = useState();

    useEffect(() => {
        getMovieList();
    }, [])

    const modalClose = () => {
        setModalShowing(false);
    }

    if(modalShowing){
        document.body.style.overflowY = 'hidden';
    }else{
        document.body.style.overflowY = '';
    }

    const getMovieList = async() => {
        if(!movieData){
            await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${count}&with_watch_monetization_types=flatrate`)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                setMovieData(response.results);
                setLoading(false);
            })
        }
    }

    const handleClick = (e) => {
        console.log(e.target);
        if(e.target.className === 'grid-item-poster'){
            for(let i =0; i < movieData.length; i++){
                if(movieData[i].id === parseInt(e.target.id)){
                    setModalData(movieData[i]);
                    setModalShowing(true);
                }
            }
        }
    }

    return(
        <main className='all-movies'>
            <Nav/>
            <Modal disabledBtn={false} modalData={modalData} modalShowing={modalShowing} onClick={modalClose}/>
            <h2 style={{color: 'white'}}>All Movies</h2>

            {loading ? <p style={{color: 'white'}}>Loading...</p> : <><div className='all-movies-grid'>
                {movieData && movieData.map(item => <img onClick={e => handleClick(e)} id={item.id} className='grid-item-poster' src={'https://image.tmdb.org/t/p/original' + item.poster_path}/>)}
            </div>

            <div className='all-movies-btn-container'>
                <button className='show-more-btn' onClick={() => alert('lets paginate this')}>Show More</button>
            </div></>}
        
        </main>
    );
}
export default AllMovies;