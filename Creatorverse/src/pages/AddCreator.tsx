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
        <div className="p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Add a New Creator</h2>
            
            {/* The onSubmit handler runs our handleSubmit function when the button is clicked */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Form Field: Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    {/* The value is tied to our state variable, and onChange updates the state as the user types */}
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                        required
                    />
                </div>

                {/* Form Field: URL */}
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                        URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                        required
                    />
                </div>

                {/* Form Field: Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                        required
                    />
                </div>

                {/* Form Field: Image URL (Optional) */}
                <div>
                    <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                    />
                </div>

                {/* The submit button for the form */}
                <button type="submit" className="bg-purple-600 text-white py-2 rounded mt-4 font-semibold hover:bg-purple-700 transition-colors">
                    Submit to Creatorverse
                </button>
            </form>
        </div>
    );
}