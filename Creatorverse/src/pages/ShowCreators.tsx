// Import our custom card component and the Link component for navigation
import { ContentCreatorCard } from '../components/ContentCreatorCard';
import { Link } from 'react-router-dom';

// The component receives the 'creators' array as a prop from App.tsx
export default function ShowCreators({ creators }) {
    return (
        <main className="container">
            {/* Navigation button to go to the Add Creator page */}
            <Link to="/add" role="button">
                Add a New Creator
            </Link>

            {/* Ternary operator: Check if creators array exists and has items */}
            {creators && creators.length > 0 ? (
                // If true, map over the array and render a card for each creator
                <div className="creator-grid">
                    {creators.map((creator) => (
                        <ContentCreatorCard
                            key={creator.id}
                            id={creator.id}
                            name={creator.name}
                            url={creator.url}
                            description={creator.description}
                            imageURL={creator.imageURL}
                        />
                    ))}
                </div>
            ) : (
                // If false (the array is empty), display a fallback message
                <hgroup>
                    <h2>No content creators found in the Creatorverse yet!</h2>
                    <p>Head over to the Add Creator page to get started.</p>
                </hgroup>
            )}
        </main>
    );
}
