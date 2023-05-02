import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";

function CreateDorm() {
    return (
        <div classname="createDormPage">
            <Formik>
                <Form>
                    <label>Name: </label>
                    <Field
                        id="inputCreateDorm"
                        name="name"
                        placeholder="Dormitory C12"
                    />
                    <label>Administrator: </label>
                    <Field
                        id="inputCreateDorm"
                        name="administrator"
                        placeholder="(Ex. John McQueen)"
                    />
                    <label>Adress: </label>
                    <Field
                        id="inputCreateDorm"
                        name="adress"
                        placeholder="Yellow Street"
                    />

                    <button type='submit'>
                        Create Dorm
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateDorm