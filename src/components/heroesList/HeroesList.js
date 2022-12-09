import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const onHeroesDelete = (id) => {
        dispatch(heroesDeleted(id))
        console.log('delete', id) 
        request(`http://localhost:3001/heroes/${id}`, "DELETE")  
    }

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        // eslint-disable-next-line
    }, []);

    const filterHeroes = (heroes, filter) => {
        switch (filter) {
            case 'all': 
                return heroes;
            case 'fire':  
                return heroes.filter(heroes => heroes.element === 'fire');
            case 'water':  
                return heroes.filter(heroes => heroes.element === 'water');
            case 'wind':  
                return heroes.filter(heroes => heroes.element === 'wind');
            case 'earth':  
                return heroes.filter(heroes => heroes.element === 'earth');
            default:
                return heroes
          } 
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem onHeroesDelete={onHeroesDelete} key={id} id={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filterHeroes(heroes, activeFilter));
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;