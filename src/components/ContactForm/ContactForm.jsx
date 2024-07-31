import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  number: Yup.string()
    .required("Number is required")
    .min(3, "Number must be at least 3 characters")
    .max(50, "Number must be at most 50 characters"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      addContact({ id: nanoid(), name: values.name, number: values.number })
    );
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className={css.formField}>
          <label htmlFor="name" className={css.label}>
            Name:
          </label>
          <Field type="text" id="name" name="name" className={css.inputField} />
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>
        <div className={css.formField}>
          <label htmlFor="number" className={css.label}>
            Number:
          </label>
          <Field
            type="text"
            id="number"
            name="number"
            className={css.inputField}
          />
          <ErrorMessage name="number" component="div" className={css.error} />
        </div>
        <button type="submit" className={css.inputField}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
