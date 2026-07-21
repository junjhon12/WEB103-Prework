import { useState, useEffect } from 'react';
// useParams grabs the dynamic parts of the URL (like the ID)
import { useParams, Link } from 'react-router-dom'; 
import { supabase } from '../client'; 
import { ContentCreatorCard } from '../components/ContentCreatorCard';

export default function ViewCreator() {
    // Extract the 'id' parameter from the URL (e.g., /view/15 -> id is 15)
    const { id } = useParams();
    
    // State to hold the specific creator's data
    const [creator, setCreator] = useState<any>(null);

    // Fetch the creator's data when the component mounts or the ID changes
    useEffect(() => {
        const fetchCreator = async () => {
            // Query Supabase for the single row where the 'id' column matches our URL id
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single(); // .single() tells Supabase to return an object, not an array

            if (error) {
                console.error(error);
            } else {
                setCreator(data); // Save the fetched data to state
            }
        }
        
        fetchCreator();
    }, [id]);

    return (
        <div className="p-8">
            {/* Conditionally render the details if the data has loaded, otherwise show a loading spinner */}
            {creator ? (
                <div className="max-w-2xl mx-auto flex flex-col gap-6">
                    {/* Reuse our card component to display the creator's details */}
                    <ContentCreatorCard 
                        name={creator.name}
                        url={creator.url}
                        description={creator.description}
                        imageURL={creator.imageURL}
                    />
                    
                    {/* A button to navigate to the Edit page for this specific creator */}
                    <div className="flex gap-4 mt-4">
                        <Link to={`/edit/${creator.id}`}>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold transition-colors">
                                Edit This Creator
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                // A Tailwind-animated CSS loading spinner
                <div className="flex flex-col items-center justify-center mt-32">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
                    <h2 className="text-xl font-semibold text-gray-600 mt-6">Loading Creator Details...</h2> 
                </div>
            )}
        </div>
    );
}