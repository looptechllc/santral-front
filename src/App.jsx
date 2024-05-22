import BrandsCarousel from './components/General/BrandsCarousel'
import ElementCard from './components/General/ElementCard'
import Advantages from './components/Home/Advantages'
import ProductsGrid from './components/Home/ProductsGrid'
import Footer from './components/UI/Footer'
import elementImage from './assets/elementimage.jpg'
import SaleProducts from './components/Home/SaleProducts'

function App() {

  const element = {img: elementImage,sale:"40",name:"A beautiful item for home",price:"699",beforePrice:"999"}
  
  return (
    <>
    {/* <BrandsCarousel /> */}


    <ProductsGrid />
    <Advantages />
    <SaleProducts />
      <Footer />
    </>
  )
}

export default App
