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
        <div className="flex flex-row">
            <div className="min-w-10 min-h-20">
                {imageURL && (
                    <img src={imageURL} alt={`${name} profile`} className="w-20 h-20 rounded-full" />
                )}
            </div>
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">{description}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Visit Profile
                </a>
            </div>
        </div>
    )
}