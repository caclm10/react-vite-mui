import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'

function App() {
  return (
    <>
      <Routes>

        <Route path="/">
          <Route index element={<Index />} />
        </Route>

      </Routes>
    </>
  )
}

export default App