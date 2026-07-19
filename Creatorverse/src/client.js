import { createClient } from '@supabase/supabase-js'

const URL = 'https://hpvluzhsublxuywmtcin.supabase.co'
const API_KEY = 'sb_publishable_Rtkd4fzUrXNqV0J0IaCvtA_rcLLQJMj'

export const supabase = createClient(URL, API_KEY)