import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

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
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL || '');
            }
        }
        fetchCreator();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
            navigate('/'); 
        }
    }

    // Handle the deletion (DELETE)
    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this creator from the Creatorverse? This cannot be undone.");
        
        if (!isConfirmed) return;

        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id); 

        if (error) {
            console.error('Error deleting creator:', error);
        } else {
            console.log('Successfully deleted the creator!');
            navigate('/'); 
        }
    }

    // Build the UI
    return (
        <div className="p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Creator</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                    <input 
                        type="url" 
                        id="url"
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        rows={4}
                    />
                </div>

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

                {/* The Update and Delete Buttons */}
                <div className="flex gap-4 mt-4">
                    <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                        Update Creator
                    </button>
                    
                    {/* Notice type="button" and onClick={handleDelete} */}
                    <button type="button" onClick={handleDelete} className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors">
                        Delete Creator
                    </button>
                </div>
            </form>
        </div>
    );
}