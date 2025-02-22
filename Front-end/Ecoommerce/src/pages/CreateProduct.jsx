


import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import axios from "axios";

function CreateProduct() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    description: '',
    category: '',
    tag: '',
    price: '',
    stock: '',
    images: [],
    previewImg: [],
  });

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      const files = e.target.files;
      if (files && files.length > 0) {
        const newImages = Array.from(files);
        const newPreviewImages = newImages.map((file) => URL.createObjectURL(file));

        setFormData((prevFormData) => ({
          ...prevFormData,
          images: [...prevFormData.images, ...newImages],
          previewImg: [...prevFormData.previewImg, ...newPreviewImages],
        }));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, name, description, category, tag, price, stock, images, previewImg } = formData;

    const multiPartFormData =new FormData();
    multiPartFormData.append("name", name);
    multiPartFormData.append("discription", discription);
    multiPartFormData.append("category", category);
    multiPartFormData.append("tag", tag);
    multiPartFormData.append("price", price);
    multiPartFormData.append("stock", stock);
    multiPartFormData.append("email", email);

    if(Array.isArray(images)){
      images.forEach((image, index) => {
        multiPartFormData.append("images",image);
      });
    }


    try {
      const response = await axios.post("http://localhost:1111/user/createproduct",formData,{
        headers: { 'Content-Type':'multipart/form-data' },
        withCredentials: true,
      });
      if(response.status===200) {
        alert("Product created successfully")
        setFormData({})
      }
    } catch (error) {
      console.log("Error creating product:",error);
      alert("Failed to create product . please check the data and try again.")
    }
  };
    
  

  const categoryArr = ['electronics', 'electronics1', 'electronics3', 'electronics5'];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter your Name"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="description"
            id="description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="category"
            name="category"
            onChange={handleChange}
          >
            <option value="">choose a category</option>
            {categoryArr.map((ele) => (
              <option key={ele} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Tags
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            type="text"
            placeholder="enter product tag"
            name="tag"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            name="price"
            type="number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            name="stock"
            type="number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upload">
            Upload Photo
          </label>
          <input
            onChange={handleChange}
            name="images"
            className="hidden"
            type="file"
            id="upload"
            multiple // Allow multiple file selection
          />
          <label
            htmlFor="upload"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition"
          >
            <IoAddCircleOutline className="mr-2" />
            Upload
          </label>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {formData.previewImg.map((ele, index) => (
            <img key={index} className="w-[80px] h-[80px] object-cover rounded" src={ele} alt="img" />
          ))}
        </div>

        <input
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
export default CreateProduct;
