"use client"
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";

import * as Yup from "yup";
import Image from "next/image";
import LoadingSubmit from '@/components/LoadingSumit';


// export const metadata = {
//     title: "ISTAD - Product",
//     description: 'This is my app',
//     images: "/images/alien.png",


//     openGraph: {
//         title: 'ISTAD-PRODUCT',
//         description: 'This is my app',
//         url: 'https://next-v13-with-form-upload-file.vercel.app/',
//         images: "/images/alien.png",
//     },
//     twitter: {
//         title: 'My App',
//         description: 'This is my app',
//         url: 'https://myapp.com',
//         image: 'https://myapp.com/og.png',
//     }
// }



const FILE_SIZE = 1024 * 1024 * 2; //5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object().shape({
    title: Yup.string().required("The title is required."),
    price: Yup.string().required("The price is required."),
    categoryId: Yup.string().required("The category is required."),
    description: Yup.string().required("The description is required."),
    file: Yup.mixed()
        .test("fileFormat", "Unsupported Format", (value) => {
            if (!value) {
                return true;
            }
            return SUPPORTED_FORMATS.includes(value.type);
        })
        .test("fileSize", "File too large", (value) => {

            if (!value) {
                return true;
            }
            return value.size <= FILE_SIZE;
        }).required("File Required")

})

export default function Product() {
    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const CreateProduct = async (product) => {
        console.log("b4", product)
        product.images = [
            product.file
        ]
        const { title, price, categoryId, description, images } = product;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            title,
            price,
            categoryId,
            description,
            images,
        });
        // console.log("product raw",raw);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        try {
            const res = await fetch("https://api.escuelajs.co/api/v1/products", requestOptions)
            if (!res.ok) {
                alert("Something Went Wrong")
                // console.log(res)
            } else {
                alert("User create Successfully")
                // console.log("User create Successfully")
                const data = await res.json();
                return data;
            }
        } catch (err) {
            console.log(err)
        }
    };



    const uploadImage = async (values) => {

        try {
            const response = await axios.post(
                "https://api.escuelajs.co/api/v1/files/upload",
                values.file
            );
            console.log(response);
            setIsLoading(false);
            return response?.data?.location || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThyEKIq_a7eWEwVEoo1aTBQ6gV1KQ4BI8ojEQgnl0ITQ&s";
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className=" flex flex-col items-center justify-center my-4 min-h-screen flex-wrap">
            <Formik initialValues={{
                title: '',
                price: '',
                categoryId: '',
                description: '',
                file: undefined
            }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setIsLoading(true)
                    const formData = new FormData();
                    formData.append("file", values.file);

                    const avatar = await uploadImage({ file: formData });
                    values.file = avatar


                    // createUser(values);

                    const data = await CreateProduct(values)
                    console.log(data)
                    setSubmitting(false);
                    resetForm();
                }}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        {/* Name */}

                        <div className="relative z-0 w-full mb-3 group bg-blue-200 ">
                            <Field type="text" name="title" id="float_title"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="Title" />
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            </label>
                            <ErrorMessage name="title" component="div" className="text-red-500" />
                        </div>
                        {/*Name End*/}

                        {/* Price */}
                        <div className="relative z-0 w-full mb-6 group">
                            <Field type="number" name="price" id="price"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="Price" />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            </label>
                            <ErrorMessage name="price" component="div" className="text-red-500" />
                        </div>
                        {/*Price End*/}

                        {/* Category */}
                        <div className="relative z-0 w-full mb-6 group">
                            <Field type="number" name="categoryId" id="category"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="Category" />
                            <label 
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                           
                            </label>
                            <ErrorMessage name="categoryId" component="div" className="text-red-500" />
                        </div>
                        {/*Password End*/}

                        {/* Start descripton */}
                        <div className="relative z-0 w-full mb-6 group">
                            <Field type="text" name="description" id="description"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="Description" />
                            <label 
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            </label>
                            <ErrorMessage name="description" component="div" className="text-red-500" />
                        </div>
                        {/* End description*/}

                        {/* Avatar */}
                        <div className="relative z-0 w-full mb-6 group">
                            <Field
                                setSubmitting={isSubmitting}
                                type="file"
                                name="file"
                                title="Select a file"
                                setFieldValue={setFieldValue} 
                                component={CustomInput}
                            />
                            <ErrorMessage name="file" component="div" className="text-red-500" />
                        </div>
                        {/* Avatar End*/}

                        {/* Start Button */}
                        <div className=" text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            <button type="submit" disabled={isSubmitting}
                                className="text-white">
                                <div className="flex flex-row "> Submit {isLoading ? <LoadingSubmit /> : ""}</div>
                            </button>
                        </div>
                        {/* End button */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

function CustomInput({ field, form, setSubmitting, ...props }) {
    const [previewImage, setPreviewImage] = useState(null);
    useEffect(() => {
        if (setSubmitting) {
            setPreviewImage(null)
        }
    }, [setSubmitting])
    const handleChange = (event) => {
        const file = event.currentTarget.files[0];
        form.setFieldValue(field.name, file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">

                {previewImage && (
                    <Image unoptimized width={900} height={900} src={previewImage} alt="preview" className="mt-4 h-20 w-20" />
                )}
            </div>
            <label 
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
                
            </label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                id="file_input" type="file" onChange={handleChange}/>

        </>
    )
}