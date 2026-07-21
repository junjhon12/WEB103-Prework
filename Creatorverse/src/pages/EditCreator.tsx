import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
    // 1. Get the ID of the creator we are trying to edit from the URL
    const { id } = useParams();

    // 2. Set up state variables for the form inputs
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    // 3. Fetch the creator's current data when the page loads
    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(error);
            } else if (data) {
                // Pre-fill the form inputs with the data we got from the database
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL || '');
            }
        }
        fetchCreator();
    }, [id]); // Re-run if the ID in the URL changes

    // 4. Handle the form submission (UPDATE)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Use the .update() method and ensure we filter by the specific ID
        const { error } = await supabase
            .from('creators')
            .update({ 
                name: name, 
                url: url, 
                description: description, 
                imageURL: imageURL 
            })
            .eq('id', id);

        if (error) {
            console.error('Error updating creator:', error);
        } else {
            console.log('Successfully updated the creator!');
            // Hard refresh the page so the updated list is fetched
            window.location.href = '/'; 
        }
    }

    // 5. Handle the deletion (DELETE)
    const handleDelete = async () => {
        // Ask the user for confirmation before proceeding
        const isConfirmed = window.confirm("Are you sure you want to delete this creator from the Creatorverse? This cannot be undone.");
        
        // If they click cancel, stop the function
        if (!isConfirmed) return;

        // Use the .delete() method and filter by the specific ID
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id); 

        if (error) {
            console.error('Error deleting creator:', error);
        } else {
            console.log('Successfully deleted the creator!');
            // Hard refresh the page so the updated list is fetched
            window.location.href = '/'; 
        }
    }

    // 6. Build the UI
    return (
        <div className="p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Creator</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Form Field: Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Form Field: URL */}
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                    <input 
                        type="url" 
                        id="url"
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                {/* Form Field: Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        rows={4}
                        required
                    />
                </div>

                {/* Form Field: Image URL */}
                <div>
                    <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                    <input 
                        type="url" 
                        id="imageURL"
                        value={imageURL} 
                        onChange={(e) => setImageURL(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-4">
                    {/* This button triggers the form's onSubmit event */}
                    <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors font-semibold">
                        Update Creator
                    </button>
                    
                    {/* This button explicitly calls the handleDelete function. type="button" prevents it from submitting the form */}
                    <button type="button" onClick={handleDelete} className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors font-semibold">
                        Delete Creator
                    </button>
                </div>
            </form>
        </div>
    );
}