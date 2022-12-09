
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import { setActiveFilter } from '../../actions';
import { filtersFetching, filtersFetched, filtersFetchingError, } from '../../actions';

const HeroesFilters = () => {

    const [activ, setActiv] = useState('')

    const { filtersLoadingStatus, filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
        // eslint-disable-next-line
    }, []);


    const onActiveClass = (e) => {
        setActiv(e.target.name)
        dispatch(setActiveFilter(e.target.name))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={(e)=> onActiveClass(e)} name='all' className="btn btn-outline-dark active">Все</button>
                    <button onClick={(e)=> onActiveClass(e)} name='fire' className="btn btn-danger">Огонь</button>
                    <button onClick={(e)=> onActiveClass(e)} name='water' className="btn btn-primary">Вода</button>
                    <button onClick={(e)=> onActiveClass(e)} name='earth' className="btn btn-secondary">Земля</button>
                    <button onClick={(e)=> onActiveClass(e)} name='wind' className="btn btn-success">Ветер</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;