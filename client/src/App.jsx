import { Routes, Route } from "react-router-dom"
import IndexPage from "../Pages/IndexPage";
import UserPage from "../Pages/UserPage";
import axios from "axios";
import Layout from "../Components/Layout";

axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/user' element={<UserPage />} />
      </Route>
    </Routes>
  )
}