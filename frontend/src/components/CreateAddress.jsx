import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateAddress = () => {
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [addressType, setaddressType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addressData = {
            country,
            city,
            address,
            pincode,
            addressType
        };
         console.log(addressData)
        try {
            const response = await axios.put("http://localhost:8080/user/add-address",addressData,{
                withCredentials:true
            })
                
            if (response.status === 201) {
                alert("Address added successfully!");
                
            }
        } catch (err) {
            console.error("Error adding address:", err);
            alert("Failed to add address. Please check the data and try again.");
        }
    };

    return (
        <>
            
            <div className="w-[90%] max-w-[500px] bg-white shadow h-auto rounded-[4px] p-4 mx-auto">
                <h5 className="text-[24px] font-semibold text-center">Add Address</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="pb-1 block">Country</label>
                        <input
                            type="text"
                            value={country}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Enter country"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">City</label>
                        <input
                            type="text"
                            value={city}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Address</label>
                        <input
                            type="text"
                            value={address}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address 1"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Pin Code</label>
                        <input
                            type="number"
                            value={pincode}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="Enter zip code"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Address Type</label>
                        <input
                            type="text"
                            value={addressType}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setaddressType(e.target.value)}
                            placeholder="Enter address type"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
                    >
                        Add Address
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateAddress;