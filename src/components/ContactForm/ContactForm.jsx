import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be less than 50 characters")
    .required("This field is required"),
  number: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be less than 50 characters")
    .required("This field is required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact({ name: values.name, number: values.number }));
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
