import ProductCard from "../components/product";
import { useEffect ,useState} from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"




export default function ProductPage() {
   
    let [data,setData]=useState([])
   
    const navigate=useNavigate()
    useEffect(() => {
      const fetchData = async () => {
          try {
              let response = await axios.get("http://localhost:8080/product/allproduct");
              
              if (response.status === 200) {  
                 
                  setData(response.data.message);
              }
          } catch (error) {
              console.error("Error fetching products:", error);
          }
      };

      fetchData();  
  }, []);
   

  const handleClick = (id) => {
   
    navigate("/pro", { state: { id } });
   };




    return (
      <div className="w-full min-h-screen bg-neutral-800">
        <div className="grid grid-cols-5 gap-4 p-4">
          {data.map((product, index) => (
            <ProductCard key={index} {...product}  click={()=>handleClick(product._id)}  />
          ))}
        </div>
      </div>
    );
  }
  