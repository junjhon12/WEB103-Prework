import { ContentCreatorCard } from '../components/ContentCreatorCard';
import { Link } from 'react-router-dom';

export default function ShowCreators({ creators }) {
    return (
        <div className="p-8">
            <div className="mb-8">
                <Link to="/add">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold">
                        Add a New Creator
                    </button>
                </Link>
            </div>
            
            {creators && creators.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-center">
                    {creators.map((creator) => (
                        <div key={creator.id} className="flex flex-col items-center gap-4">
                            
                            <ContentCreatorCard 
                                name={creator.name} 
                                url={creator.url} 
                                description={creator.description} 
                                imageURL={creator.imageURL} 
                            />
                            
                            <Link to={`/view/${creator.id}`}>
                                <button className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-200 transition-colors shadow-sm">
                                    View Details
                                </button>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-20">
                    <h2 className="text-2xl font-semibold">No content creators found in the Creatorverse yet!</h2>
                    <p className="text-gray-600 mt-4">Head over to the Add Creator page to get started.</p>
                </div>
            )}
        </div>
    );
}