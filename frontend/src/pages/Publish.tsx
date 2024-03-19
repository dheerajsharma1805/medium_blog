import React from "react";
import { Formik, Form, Field } from "formik";
import { postBlog } from "../server";
import { useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  content: "",
};

interface formValues {
  title: string;
  content: string;
}

const Publish = () => {
  const navigate = useNavigate();

  const handlePublish = async (values: formValues) => {
    console.log(values); // You can handle form submission here
    const token: string | null = localStorage.getItem("token");
    if (token) {
      const res: any = await postBlog(values, token);
      console.log("res ", res);
      if (res && res.id) {
        navigate("/blogs");
      }
    } else {
      navigate("/signin");
    }
  };

  const backBtnHandler = () => {
    navigate("/blogs");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Formik initialValues={initialValues} onSubmit={handlePublish}>
        <Form>
          <Field
            id="title"
            name="title"
            className="shadow appearance-none border text-3xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            component="textarea"
            rows={2}
            placeholder="Title"
          />
          <Field
            id="content"
            name="content"
            className="shadow appearance-none border text-md rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            component="textarea"
            rows={8}
            placeholder="Content"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={backBtnHandler}
              className="text-dark bg-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              Back
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Publish;
