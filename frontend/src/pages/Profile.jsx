import React, { useEffect, useState } from "react";
import AddressCard from "../components/AddressCard";
import axios from "axios";
import CreateAddress from "../components/CreateAddress"

export default function Profile() {
	const [personalDetails, setPersonalDetails] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		avatarUrl: "",
	});

	const [addresses, setAddresses] = useState([]);
	const [profilePhoto, setProfilePhoto] = useState(null)
	const [addAddress, setAddAddress] = useState(false)

	useEffect(() => {
		fetch(
			`http://localhost:8080/user/checklogin`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include"
			}
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				setProfilePhoto(data.message.profilePhoto)
				setPersonalDetails(data.message);
				setAddresses(data.message.address);

				console.log("User fetched:", data.message);
			});
	}, []);


	const changeProfilePhoto = async (e) => {
		const file = e.target.files[0];

		if (!file) {
			alert("Please select a file");
			return;
		}

		const multiPartFormData = new FormData();
		multiPartFormData.append("photo", file);

		console.log("FormData:", multiPartFormData);

		try {
			const response = await axios.post(
				"http://localhost:8080/user/upload",
				multiPartFormData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true

				}
			);

			if (response.status === 200) {
				setProfilePhoto(response.data.message.profilePhoto)
				console.log("Upload Successful:", response.data);
				e.target.value = ""
				alert("Profile Photo Updated Successfully");

			}
		} catch (error) {
			console.error("Upload Error:", error);
		}
	};

	return (
		<>
			<div className="w-full min-h-screen bg-neutral-800 p-5" >
				<div className="w-full h-full bg-neutral-700 rounded-lg border-2 flex">
					<div>
						<div className="w-full h-max my-2 p-5">
							<div className="w-full h-max">
								<h1 className="text-3xl text-neutral-100">
									Personal Details
								</h1>

							</div>
							<div className="w-full h-max flex flex-col sm:flex-row p-5 gap-10">
								<div className="w-40 h-max flex flex-col justify-center items-center gap-y-3">
									<div className="w-full h-max text-2xl text-neutral-100 text-left">
										PICTURE
									</div>
									{console.log(profilePhoto, "0000o")}
									<img
										src={profilePhoto ? `http://localhost:8080/profile-photo/${profilePhoto}` : `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`}
										alt="profile"
										className="w-40 h-40 rounded-full"
										onError={(e) => {
											e.target.onerror = null; // Prevents infinite loop if the default image also fails
											e.target.src = `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`;
										}}
									/>
									<label htmlFor="upload" className="border rounded-2xl p-2 bg-gray-500 text-white cursor-pointer">
										Update Photo
									</label>
									<input id="upload" type="file" className="hidden" onChange={changeProfilePhoto} />
								</div>
								<div className="h-max md:flex-grow">
									<div className="w-full h-max flex flex-col justify-center items-center gap-y-3">
										<div className="w-full h-max">
											<div className="text-2xl text-neutral-100 text-left">
												NAME
											</div>
											<div className="text-lg font-light text-neutral-100 text-left break-all">
												{personalDetails.name}
											</div>
										</div>
										<div className="w-full h-max">
											<div className="text-2xl text-neutral-100 text-left">
												EMAIL
											</div>
											<div className="text-lg font-light text-neutral-100 text-left break-all">
												{personalDetails.email}
											</div>
										</div>
										<div className="w-full h-max">
											<div className="text-2xl text-neutral-100 text-left">
												MOBILE
											</div>
											<div className="text-lg font-light text-neutral-100 text-left break-all">
												{personalDetails.phoneNumber}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full h-max my-2 p-5">
							<div className="w-full h-max">
								<h1 className="text-3xl text-neutral-100">
									Addresses
								</h1>
							</div>
							<div className="w-full h-max p-5">
								<button onClick={() => setAddAddress(!addAddress)} className="w-max px-3 py-2 bg-neutral-600 text-neutral-100 rounded-md text-center hover:bg-neutral-100 hover:text-black transition-all duration-100">
									Add Address
								</button>
							</div>
							<div className="w-full h-max flex flex-col gap-5 p-5">

								{addresses.length === 0 ? (
									<div className="w-full h-max text-neutral-100 font-light text-left">
										No Addresses Found
									</div>
								) : null}
								{[console.log(addresses)]}
								{addresses.map((address, index) => (
									<AddressCard key={address._id} {...address} />
								))}
							</div>
						</div>
					</div>
                     {/* address from */}
                     
					 {addAddress&&<CreateAddress/>}
					 
					
				</div>
			</div>
		</>
	);
}