export interface CreatorProps {
    name: string,
    url: string,
    description: string,
    imageURL?: string
}

export const ContentCreatorCard: React.FC<CreatorProps> = ({
    name,
    url,
    description,
    imageURL
}) => {
    return (
        /* We added a background, padding, shadow, hover effects, and responsive flex directions! */
        <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 w-full max-w-md gap-4 border border-gray-100">
            
            <div className="flex-shrink-0">
                {imageURL ? (
                    <img src={imageURL} alt={`${name} profile`} className="w-24 h-24 rounded-full object-cover shadow-sm" />
                ) : (
                    // A fallback placeholder just in case they don't have an image!
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Pic
                    </div>
                )}
            </div>
            
            <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-3">{description}</p>
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