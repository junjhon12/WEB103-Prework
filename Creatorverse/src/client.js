// Import the createClient function from the Supabase library
// This function allows us to initialize a connection to our Supabase database
import { createClient } from '@supabase/supabase-js'

// The unique URL for our Supabase project, which acts as the API endpoint
const URL = 'https://hpvluzhsublxuywmtcin.supabase.co'

// The public anon key for our Supabase project, which allows us to securely access the database
const API_KEY = 'sb_publishable_Rtkd4fzUrXNqV0J0IaCvtA_rcLLQJMj'

// Initialize the Supabase client and export it so it can be imported and used in other files
export const supabase = createClient(URL, API_KEY)