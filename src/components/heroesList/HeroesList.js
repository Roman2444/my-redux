// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import {useHttp} from '../../hooks/http.hook';
import {fetchHeroes, heroesDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus } = useSelector(state => state.heroes);
    const { activeFilter} = useSelector(state => state.filters, shallowEqual);

    const filterHeroes = (heroes, filter) => {
        if (filter === 'all') {
              return heroes;
        } else {
            return heroes.filter(heroes => heroes.element === filter);
        }
    }

    const dispatch = useDispatch();
    const {request} = useHttp();
    
    useEffect(() => {
        dispatch(fetchHeroes(request))
        // eslint-disable-next-line
    }, []);

    const onHeroesDelete = useCallback((id) => {

        request(`http://localhost:3001/heroes/${id}`, "DELETE")  
            .then(dispatch(heroesDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem onHeroesDelete={onHeroesDelete} id={id} {...props}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filterHeroes(heroes, activeFilter));
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;