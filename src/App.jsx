
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
import Header from './components/UI/Header'
import Profile from './Pages/Profile'
import News from './Pages/News'
import NewsDetail from './Pages/NewsDetail'
import Products from './Pages/Products'


function App() {


  
  return (
    <>
    <BrowserRouter>
    {/* <BrandsCarousel /> */}
    <Header />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/success' element={<Success />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/news' element={<News />} />
        <Route path='/news/:slug' element={<NewsDetail />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/category/:id' element={<CategoryDesc />} />
        <Route path='/products/:query' element={<Products />} />
        <Route path='/product/:name' element={<Product />} />
      </Routes>

    
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
