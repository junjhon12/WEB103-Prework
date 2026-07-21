// Import our custom card component and the Link component for navigation
import { ContentCreatorCard } from '../components/ContentCreatorCard';
import { Link } from 'react-router-dom';

// The component receives the 'creators' array as a prop from App.tsx
export default function ShowCreators({ creators }) {
    return (
        <div className="p-8">
            {/* Navigation button to go to the Add Creator page */}
            <div className="mb-8">
                <Link to="/add">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold">
                        Add a New Creator
                    </button>
                </Link>
            </div>
            
            {/* Ternary operator: Check if creators array exists and has items */}
            {creators && creators.length > 0 ? (
                // If true, map over the array and render a card for each creator
                <div className="flex flex-wrap gap-6 justify-center">
                    {creators.map((creator) => (
                        // We wrap the card in a Link so the entire card is clickable
                        // The 'key' prop is required by React when mapping over lists
                        <Link 
                            to={`/view/${creator.id}`} 
                            key={creator.id} 
                            className="transition-transform hover:scale-105"
                        >
                            <ContentCreatorCard 
                                name={creator.name} 
                                url={creator.url} 
                                description={creator.description} 
                                imageURL={creator.imageURL} 
                            />
                        </Link>
                    ))}
                </div>
            ) : (
                // If false (the array is empty), display a fallback message
                <div className="text-center mt-20">
                    <h2 className="text-2xl font-semibold">No content creators found in the Creatorverse yet!</h2>
                    <p className="text-gray-600 mt-4">Head over to the Add Creator page to get started.</p>
                </div>
            )}
        </div>
    );
}