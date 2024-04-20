import { useEffect, useState } from "react";
//import { useAxios } from "./customHooks/useAxios";
import axios from "axios";

function App() {
//   const { response } = useAxios({
//     method: 'get',
//     url: '/api/',
//     headers: JSON.stringify({ accept: '*/*' }),
//     body: JSON.stringify({
//       userId: 1,
//       id: 19392,
//       title: 'title',
//       body: 'Sample text',
//   }),
// });
const [data, setData] = useState([]);

useEffect(() => {
    axios.get('/api').then((res)=> {setData(res.data),console.log(res.data)});
}, []);
  return <>
  <div>Aman Kumar</div>
  {data.message}</>;
}

export default App;
