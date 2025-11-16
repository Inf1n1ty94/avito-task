import { Routes, Route } from 'react-router-dom'

import ListPage from './pages/ListPage/ListPage.jsx'
import DetailsPage from './pages/DetailsPage/DetailsPage.jsx'
import StatsPage from './pages/StatsPage/StatsPage.jsx'

import './App.css'

export default function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element = {<ListPage />}/>
          <Route path="/ads/:id" element = {<DetailsPage />}/>
          <Route path="/stats" element = {<StatsPage />}/>
        </Routes>

      </div>
    </>
  )
}
