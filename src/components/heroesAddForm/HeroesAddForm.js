
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useHttp} from '../../hooks/http.hook';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {  heroesAdded } from '../heroesList/heroesSlice';
import { useDispatch } from 'react-redux';

const HeroesAddForm = () => {

    const {request} = useHttp();

    const dispatch = useDispatch();

    const onAddHero = (hero) => {
        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
            .then(dispatch(heroesAdded(hero)))
            .catch((err) => console.log(err))
    }

    const SelectElement = (props) => {
        return (
            <>
                <Field 
                    id="element" 
                    name="element"  
                    type="element" 
                    className="form-select" 
                    as="select">
                        <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                </Field>
                <FormikErrorMessage name="element" />
            </>
        )
    }

    return (
       
        <Formik
            initialValues = {{
                name: '',
                description: '',
                element: ''
            }}
            validationSchema = {Yup.object({
                name: Yup.string().required('Заполните это поле'),
                description: Yup.string().min(5, "Описание, д.б. не менее 5 символов"),
                element: Yup.string().required("выберите элемент героя")
            })}
            onSubmit = {(values, {resetForm} )=> {
                values.id = uuidv4()
                onAddHero(values)
                resetForm()
            }}
        >
            <Form className="border p-4 shadow-lg rounded"> 
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        id="name" 
                        name='name' 
                        type='text' 
                        className="form-control" 
                        placeholder="Как меня зовут?"/>
                    <FormikErrorMessage  name="name" /> 
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field 
                        id="text" 
                        name='description' 
                        type='textarea' 
                        className="form-control" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}
                        as="textarea"/>
                    <FormikErrorMessage name="description" /> 
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <SelectElement/>
                </div>
                <button type="submit" className="btn btn-primary">Создать</button> 
            </Form>
        </Formik>
       
    )
}

export default HeroesAddForm;