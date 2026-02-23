import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[PilotPath] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set — ' +
    'cloud sync and auth are disabled. The app works fully offline without them.'
  )
}

// createClient is safe with empty strings — all network calls are gated on
// auth state checks, so nothing breaks when env vars are missing.
export const supabase = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? ''
)

/** True only if Supabase env vars are configured. */
export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey)
