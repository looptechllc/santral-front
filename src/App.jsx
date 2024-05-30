import BrandsCarousel from './components/General/BrandsCarousel'
import ElementCard from './components/General/ElementCard'
import Advantages from './components/Home/Advantages'
import ProductsGrid from './components/Home/ProductsGrid'
import Footer from './components/UI/Footer'
import elementImage from './assets/elementimage.jpg'
import SaleProducts from './components/Home/SaleProducts'
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Success from './Pages/Success'
import Registration from './Pages/Registration'
import Categories from './Pages/Categories'
import CategoryDesc from './components/Categories/CategoryDesc'
import Product from './Pages/Product'


function App() {

  const element = {img: elementImage,sale:"40",name:"A beautiful item for home",price:"699",beforePrice:"999"}
  
  return (
    <>
    <BrowserRouter>
    {/* <BrandsCarousel /> */}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/success' element={<Success />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/category/:id' element={<CategoryDesc />} />
        <Route path='/product/:name' element={<Product />} />
      </Routes>

    
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
