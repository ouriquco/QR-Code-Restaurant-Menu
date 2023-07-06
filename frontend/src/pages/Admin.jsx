import React,{useState,useEffect} from 'react'
import { AdminMid } from '../components/admin/AdminMid'
import { Navbar } from '../components/navbar/Navbar'
import { ListItems } from '../components/admin/ListItems'
import { useParams } from 'react-router-dom'
import { menu } from '../components/Data'
import axios from 'axios'

export const Admin = () => {
  const {id} = useParams()
  const [category,setCategory] = useState("Main")
  const [items,setItems] = useState(menu)
  const [orderNum,setOrderNum] = useState(0)
  const [customerItems,setCustomerItmes] = useState([])


  // useEffect(() => {
  //   const getAllMenus = async () => {
  //     try {
  //       const res = await axios.get("http://127.0.0.1:5000/menu")
  //       setItems(res.data)
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   }

  //   getAllMenus()
  // },[])


  useEffect(() => {
    setItems(category === "Main" ? items : items.filter((item) => item.category === category))
  },[category])

  return (
    <>
      <div className="table-top">
        <Navbar orderNum={orderNum} id={id}/>
        <AdminMid setCategory={setCategory}/>
      </div>
      <div className="table-bottom admin-bottom w-1/2 mt-10 mx-auto">
          {items?.map((item) => (
            <ListItems
              key={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              calories={item.calories}
              url={item.url}
              desc={item.desc}
              orderNum={orderNum}
              setOrderNum={setOrderNum}
              customerItems={customerItems}
              setCustomerItmes={setCustomerItmes}
            />
          ))}
      </div>
    </>
  )
}
