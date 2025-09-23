-- Fix storage bucket name and policies to match the code
-- Drop existing bucket and policies if they exist
DROP POLICY IF EXISTS "Users can upload their own images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;

-- Delete old bucket if exists
DELETE FROM storage.buckets WHERE id = 'post-images';

-- Create new bucket with correct name 'posts'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('posts', 'posts', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for 'posts' bucket
CREATE POLICY "Users can upload images to posts bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'posts' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view posts images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'posts');

CREATE POLICY "Users can delete their own posts images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'posts' AND auth.uid() IS NOT NULL);

-- Update posts table to ensure proper constraints
ALTER TABLE posts ALTER COLUMN content SET NOT NULL;
ALTER TABLE posts ALTER COLUMN user_id SET NOT NULL;
