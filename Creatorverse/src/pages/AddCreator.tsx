import { useState } from 'react';
import { supabase } from '../client';

export default function AddCreator() {
    // 1. Set up state variables for every form field (Controlled Components)
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    // 2. Define the asynchronous function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent the default browser behavior of refreshing the page on submit
        e.preventDefault();

        // 3. Send the data to Supabase using the .insert() method
        const { error } = await supabase
            .from('creators')
            .insert([
                {
                    name: name,
                    url: url,
                    description: description,
                    imageURL: imageURL
                }
            ]);

        // Check for errors, otherwise redirect the user to the home page
        if (error) {
            console.error('Error adding creator:', error);
        } else {
            console.log('Successfully added a new creator!');
            // Hard refresh the page so the App.tsx fetches the newly updated list
            window.location.href = '/';
        }
    }

    // 4. Build the UI
    return (
        <main className="container">
            <h2>Add a New Creator</h2>

            {/* The onSubmit handler runs our handleSubmit function when the button is clicked */}
            <form onSubmit={handleSubmit}>

                {/* Form Field: Name */}
                <label htmlFor="name">
                    Name
                    {/* The value is tied to our state variable, and onChange updates the state as the user types */}
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                {/* Form Field: URL */}
                <label htmlFor="url">
                    URL
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>

                {/* Form Field: Description */}
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>

                {/* Form Field: Image URL (Optional) */}
                <label htmlFor="imageURL">
                    Image URL (Optional)
                    <input
                        type="url"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </label>

                {/* The submit button for the form */}
                <button type="submit">
                    Submit to Creatorverse
                </button>
            </form>
        </main>
    );
}
