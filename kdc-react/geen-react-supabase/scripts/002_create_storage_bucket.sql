-- Create storage bucket for posts
INSERT INTO storage.buckets (id, name, public) VALUES ('posts', 'posts', true);

-- Set up storage policies for posts bucket
CREATE POLICY "Anyone can view post images" ON storage.objects FOR SELECT USING (bucket_id = 'posts');

CREATE POLICY "Users can upload post images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'posts' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own post images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'posts' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own post images" ON storage.objects FOR DELETE USING (
  bucket_id = 'posts' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
