// Define a TypeScript interface to enforce the shape of the props this component expects
// The '?' on imageURL means it is optional
export interface CreatorProps {
    name: string,
    url: string,
    description: string,
    imageURL?: string
}

// Define the functional component and destructure the expected props
export const ContentCreatorCard: React.FC<CreatorProps> = ({
    name,
    url,
    description,
    imageURL
}) => {
    return (
        // The outer container for the card, styled with Tailwind for a responsive flex layout, padding, and hover effects
        <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 w-full max-w-md gap-4 border border-gray-100">
            
            {/* The image container */}
            <div className="shrink-0">
                {/* Conditionally render the image if a URL is provided, otherwise show a placeholder */}
                {imageURL ? (
                    <img src={imageURL} alt={`${name} profile`} className="w-24 h-24 rounded-full object-cover shadow-sm" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Pic
                    </div>
                )}
            </div>
            
            {/* The text content container */}
            <div className="flex flex-col text-center md:text-left">
                {/* Display the creator's name */}
                <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                
                {/* Display the description, clamped to a maximum of 3 lines */}
                <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-3">{description}</p>
                
                {/* A link to the creator's actual channel/profile */}
                {/* target="_blank" and rel="noopener noreferrer" ensure it opens safely in a new tab */}
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold hover:bg-purple-200 transition-colors"
                >
                    Visit Profile
                </a>
            </div>
        </div>
    )
}