import { useState, useEffect } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import ShowCreator from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator';
// @ts-ignore
import { supabase } from './client';

function App() {
  const [creators, setCreators] = useState([])

  const routes = useRoutes([
    {path: '/', element: <ShowCreator creators={creators} />}, 
    {path: '/view/:id', element: <ViewCreator />},
    {path: '/edit/:id', element: <EditCreator />},
    {path: '/add', element: <AddCreator />}
  ])

  useEffect(() => {
    const fetchCreators = async () => {
        // 4. Cleaned up the query to fetch ALL creators
        const { data, error } = await supabase
            .from('creators')
            .select('*');
            
        if (error) {
            console.error(error);
        } else {
            setCreators(data);
        }
    }
    fetchCreators();
  }, []);

  return (
    <>
      {routes}
    </>
  )
}

export default App