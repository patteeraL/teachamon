import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = data;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}