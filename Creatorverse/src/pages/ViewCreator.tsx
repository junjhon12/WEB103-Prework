import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { supabase } from '../client'; 
import { ContentCreatorCard } from '../components/ContentCreatorCard';

export default function ViewCreator() {
    const { id } = useParams();
    const [creator, setCreator] = useState<any>(null);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(error);
            } else {
                setCreator(data);
            }
        }
        
        fetchCreator();
    }, [id]);

    return (
        <div className="p-8">
            {creator ? (
                <div className="max-w-2xl mx-auto flex flex-col gap-6">
                    <ContentCreatorCard 
                        name={creator.name}
                        url={creator.url}
                        description={creator.description}
                        imageURL={creator.imageURL}
                    />
                    
                    <div className="flex gap-4 mt-4">
                        <Link to={`/edit/${creator.id}`}>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold transition-colors">
                                Edit This Creator
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-32">
                    {/* The Tailwind animated spinning ring */}
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
                    <h2 className="text-xl font-semibold text-gray-600 mt-6">Loading Creator Details...</h2> 
                </div>
            )}
        </div>
    );
}