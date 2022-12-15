import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {

    const [createHero] = useCreateHeroMutation()

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
                createHero(values).unwrap()
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
                </div>
                <button type="submit" className="btn btn-primary">Создать</button> 
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;