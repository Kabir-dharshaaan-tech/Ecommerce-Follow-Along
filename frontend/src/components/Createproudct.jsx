import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { data, useLocation } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
function CreateProduct() {

    const location = useLocation();
    const productData =location.state || {}
    
    const { _id, email, name, description, category, tags, price, stock, images, edit } = productData

    console.log(images)
    
    let prevImg = []
    if (images) {
        images.forEach((ele, ind) => (
            prevImg.push(`http://localhost:8080/products-photo/${ele}`)
        ))
    }
  
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        description: "",
        category:"",
        tags: [],
        price: "",
        stock: "",
        images: [],
        previewImg:[]
    });

    useEffect(()=>{
        setFormData({
            email: email || "",
            name: name || "",
            description: description || "",
            category: category || "",
            tags: tags || [],
            price: price || "",
            stock: stock || "",
            images: images || [],
            previewImg: prevImg || []
        });
    }, [email, name, description, category, tags, price, stock, images]);
   

    const handleDeletePrevImg =(index)=>{
        let filterdImage=formData.images.filter((ele,ind)=>(ind!=index))
        let filterdPreviewImg=formData.previewImg.filter((ele,ind)=>(ind!=index))
        setFormData({...formData,images:filterdImage,previewImg:filterdPreviewImg})
        console.log(filterdImage)
    }

    const handleChange = (e) => {
        console.log("hhjhghg")
        if (e.target.name === "tags") {

            let tagArr = e.target.value.split(",")
            let trimmedtagArr = tagArr.map((ele) => {
                return ele.trim()
            })
            console.log(trimmedtagArr)
            setFormData({ ...formData, tags: trimmedtagArr })
        }
        else if (e.target.name === "images") {
            const files = e.target.files;
            const imgUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setFormData(prevState => ({
                ...prevState,
                images: [...prevState.images, ...files],
                previewImg: [...prevState.previewImg, ...imgUrls]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("jjjj")
        const { email, name, description, category, tags, price, stock, images } = formData;

        if (!email || !name || !description || !category || !price || !stock) {
            alert("Please fill in all required fields");
            return;
        }

        console.log({
            email, name, description, category, tags, price, stock, images
        }, "form data");
        
        const multiPartFormData = new FormData;
        multiPartFormData.append("name", name);
        multiPartFormData.append("description", description);
        multiPartFormData.append("category", category);
        multiPartFormData.append("tags", tags);
        multiPartFormData.append("price", price);
        multiPartFormData.append("stock", stock);
        multiPartFormData.append("email", email);

        if (Array.isArray(images)) {
            images.forEach(image => {
                multiPartFormData.append("images", image)
            });
        }

        try {
            const response = await axios.post("http://localhost:8080/product/create-product", multiPartFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })

            if (response.status === 201) {
                console.log(response)
                alert("Product Created Successfully");
                setFormData({});
            }
        }

        catch (error) {
            console.log("Error", error)
            // alert("Product is Not Created")
        }

    };


    const handleEdit = async(e) => {
        e.preventDefault()
        const { email, name, description, category, tags, price, stock, images } = formData;
        const multiPartFormData = new FormData;
        multiPartFormData.append("name", name);
        multiPartFormData.append("description", description);
        multiPartFormData.append("category", category);
        multiPartFormData.append("tags", tags);
        multiPartFormData.append("price", price);
        multiPartFormData.append("stock", stock);
        multiPartFormData.append("email", email);
        if (Array.isArray(images)) {
            images.forEach(image => {
                multiPartFormData.append("images", image)
            });
        }
        try {
            const response =await axios.put(`http://localhost:8080/product/update/${_id}`,multiPartFormData)
            console.log(response)
        } catch (error) {
            console.log(error) 
        }
       
    }



    let categoryArr = ["Electronic", "Groceries", "Fashion", "Dairy"];

    return (

        <div className='flex justify-center items-center min-h-screen bg-cover bg-center' style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?office,technology')" }}>
            <div className='w-full max-w-lg bg-white p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Create a New Product</h2>
                {console.log(formData)}
                <form  className='space-y-4'>
                    <div>
                        <label className='block font-medium text-gray-700'>Email</label>
                        <input className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' type="email" placeholder='Enter your email' name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Name</label>
                        <input className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter product name' name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Description</label>
                        <textarea className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' value={formData.description} name="description" onChange={handleChange} required></textarea>
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Category</label>
                        <select className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' name="category" onChange={handleChange} required>
                            <option value="">Choose a category</option>
                            {categoryArr.map((ele, index) => (
                                <option key={index} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Tags <i className='text-red-100'>add multiple tags seperated by coma</i></label>
                        <input className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter product tag' name="tags" value={formData.tags} onChange={handleChange} />
                    </div>

                    <div className='flex space-x-4'>
                        <div className='w-1/2'>
                            <label className='block font-medium text-gray-700'>Price</label>
                            <input className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' type="number" name="price" onChange={handleChange} value={formData.price} required />
                        </div>
                        <div className='w-1/2'>
                            <label className='block font-medium text-gray-700'>Stock</label>
                            <input className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' type="number" name="stock" onChange={handleChange} value={formData.stock} required />
                        </div>
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Upload Photo</label>
                        <input className='hidden' type="file" name="images" id='upload' multiple onChange={handleChange} />
                        <label htmlFor="upload" className='cursor-pointer flex items-center space-x-2 text-blue-500 hover:text-blue-700'>
                            <IoIosAddCircleOutline size={24} />
                            <span>Add Images</span>
                        </label>
                    </div>

                    <div className='flex flex-wrap gap-2 mt-2'>
                        {formData.previewImg.map((img, index) => (
                          <div key={index}> 
                            <IoCloseCircleOutline onClick={()=>handleDeletePrevImg(index)} className='relative left-15 ' />
                            <img key={index} src={img} alt={`Preview ${index}`} className='w-20 h-20 object-cover rounded-md shadow-md' />
                          </div>
                            
                        ))}
                    </div>
                   
                    {edit ? <button onClick={handleEdit} className='w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition'>
                        edit
                    </button> : <button  onClick={handleSubmit} className='w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition'>
                        Submit
                    </button>

                    }

                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
