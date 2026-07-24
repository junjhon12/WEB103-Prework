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
        <main className="container">
            {/* Conditionally render the details if the data has loaded, otherwise show a loading spinner */}
            {creator ? (
                <>
                    {/* Reuse our card component to display the creator's details */}
                    <ContentCreatorCard
                        name={creator.name}
                        url={creator.url}
                        description={creator.description}
                        imageURL={creator.imageURL}
                    />

                    {/* A button to navigate to the Edit page for this specific creator */}
                    <Link to={`/edit/${creator.id}`} role="button">
                        Edit This Creator
                    </Link>
                </>
            ) : (
                // Pico's built-in aria-busy spinner
                <h2 aria-busy="true">Loading Creator Details...</h2>
            )}
        </main>
    );
}
