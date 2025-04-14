import ProductCard from "../components/product";
import { useEffect ,useState} from "react";
import axios from "axios"






export default function SellerProcutPage() {
    
    let [data,setData]=useState([])
    const [dle,setDle]=useState(false)
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
  }, [dle]);



  const dele  = async(id)=>{
    console.log("jjjjj")
    try {
     let responde=await axios.delete(`http://localhost:8080/product/delete/${id}`) 
     
     console.log(responde.data)
     setDle(!dle)
    } catch (error) {
       console.log(error)
       
    }
     
     
  }



    return (
      <div className="w-full min-h-screen bg-neutral-800">
        <div className="grid grid-cols-5 gap-4 p-4">
          {data.map((product, index) => (
            <ProductCard key={index} {...product} role={"seller"} dele={()=>dele(product._id)} />
          ))}
        </div>
      </div>
    );
  }
  