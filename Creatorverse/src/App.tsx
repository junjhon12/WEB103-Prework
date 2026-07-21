// Import necessary hooks from React for managing state and side effects
import { useState, useEffect } from 'react'
import './App.css'

// Import useRoutes from React Router to handle page navigation
import { useRoutes } from 'react-router-dom'

// Import all of our page components that will act as our separate views
import ShowCreator from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator';

// Import our configured Supabase client to interact with the database
import { supabase } from './client';

function App() {
  // State variable to store the array of creators fetched from the database
  const [creators, setCreators] = useState([])

  // Define our application's routes and the components they render
  // Notice how we pass the 'creators' state down to ShowCreator as a prop!
  const routes = useRoutes([
    {path: '/', element: <ShowCreator creators={creators} />}, 
    {path: '/view/:id', element: <ViewCreator />}, // :id allows us to grab the specific creator's ID from the URL
    {path: '/edit/:id', element: <EditCreator />},
    {path: '/add', element: <AddCreator />}
  ])

  // useEffect runs the code inside it when the component first loads
  useEffect(() => {
    // Define an asynchronous function to fetch the creators from Supabase
    const fetchCreators = async () => {
        // Query the 'creators' table and select all columns ('*')
        const { data, error } = await supabase
            .from('creators')
            .select('*');
            
        // If there's an error, log it. Otherwise, save the data to our state variable
        if (error) {
            console.error(error);
        } else {
            setCreators(data);
        }
    }
    
    // Call the function we just defined
    fetchCreators();
  }, []); // The empty dependency array means this only runs once when the App mounts

  // Render the matched route element based on the current URL
  return (
    <>
      {routes}
    </>
  )
}

export default App