



import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from 'react';

function CreateProduct() {


    const [formData, setFormData] = useState({
        email: "",
        name: "",
        description: "",
        category: "",
        tag: "",
        price: "",
        stock: "",
        images: [],
        previewImg: []


    })

    const handleChange = (e) => {

        if (Array.isArray(formData[e.target.name])) {

            console.log(e.target.files)
            let imgUrl = URL.createObjectURL(e.target.files[e.target.files.length - 1])
            setFormData({ ...formData, [e.target.name]: [...formData[e.target.name], e.target.files], previewImg: [...formData.previewImg, imgUrl] })
        }
        else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const { email, name,
            description,
            category,
            tag,
            price,
            stock,
            images,
            previewImg } = formData

        console.log({
            email, name,
            description,
            category,
            tag,
            price,
            stock,
            images,
            previewImg
        },"form data")
        

    }



    let catogoryArr = ["electronis", "electronis1", "electronis3", "electronis5"]




    return (
        <>
            {console.log(formData)}
            <div className='w-[50%] border-1 bg-amber-50'>

                <p>Create Product</p>

                <form action="" onSubmit={handleSubmit}>

                    <label className='block' htmlFor="">Email</label>
                    <input className='border-1' type="email" placeholder='Enter your email' name="email" id=""
                        onChange={handleChange}
                    />

                    <label className='block' htmlFor="">Name</label>
                    <input className='border-1' type="text" placeholder='Enter your Name' name="name"
                        onChange={handleChange}
                    />

                    <label className='block' htmlFor="">Description</label>
                    <textarea className='border-1' name="description" id="" onChange={handleChange} ></textarea>

                    <label className='block' htmlFor="">category</label>
                    <select id="" name="category" onChange={handleChange}>
                        <option value="">choose a category</option>
                        {catogoryArr.map(ele => (
                            <option value={ele}>{ele}</option>
                        ))}

                    </select>


                    <label className='block' htmlFor="">tags</label>
                    <input onChange={handleChange} className='border-1' type="text" placeholder='enter product tag' name='tag' />

                    <label className='block' htmlFor="">Price</label>
                    <input onChange={handleChange} name='price' className='border-1' type="number" />


                    <label className='block' htmlFor="">stock</label>
                    <input onChange={handleChange} className='border-1' name='stock' type="number" />

                    <label className='block' htmlFor="">upload photo</label>
                    <input onChange={handleChange} name='images' className='border-1 hidden' type="file" id='upload' />

                    <label htmlFor="upload">
                        <IoAddCircleOutline />
                    </label>

                    <div className='flex'>
                        {formData.previewImg.map((ele) => (
                            <img className='w-[50px]' src={ele} alt="img" />
                        ))}
                    </div>


                    <input type="submit" />

                </form>



            </div>
        </>

    )
}

export default CreateProduct
