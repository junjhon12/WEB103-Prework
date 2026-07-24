import { Link } from 'react-router-dom';

// Define a TypeScript interface to enforce the shape of the props this component expects
// The '?' on imageURL and id means they are optional
export interface CreatorProps {
    id?: number | string,
    name: string,
    url: string,
    description: string,
    imageURL?: string
}

// Define the functional component and destructure the expected props
export const ContentCreatorCard: React.FC<CreatorProps> = ({
    id,
    name,
    url,
    description,
    imageURL
}) => {
    return (
        // Pico's <article> element already looks like a card
        <article className="creator-card">
            {/* Conditionally render the image if a URL is provided, otherwise show a placeholder */}
            {imageURL ? (
                <img src={imageURL} alt={`${name} profile`} />
            ) : (
                <div className="no-pic">No Pic</div>
            )}

            {/* The text content container */}
            <div>
                {/* When an id is provided the name links to that creator's detail page */}
                {id !== undefined ? (
                    <h3><Link to={`/view/${id}`}>{name}</Link></h3>
                ) : (
                    <h3>{name}</h3>
                )}

                <p>{description}</p>

                {/* A link to the creator's actual channel/profile */}
                {/* target="_blank" and rel="noopener noreferrer" ensure it opens safely in a new tab */}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="button"
                    className="secondary outline"
                >
                    Visit Profile
                </a>
            </div>
        </article>
    )
}
