import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!

// TEMP DEBUG — remove after confirming env vars load correctly
console.log('[supabase-admin] URL present:', !!supabaseUrl, 'length:', supabaseUrl?.length);
console.log('[supabase-admin] Service role present:', !!supabaseServiceRole, 'length:', supabaseServiceRole?.length);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole)