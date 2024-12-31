import axios from 'axios';

class UnsplashApiHandler {
    UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

    async fetchPhoto(query: string) {
        try {
            const unsplashResponse = await axios.get(`https://api.unsplash.com/search/photos`, {
                params: {
                    query: query,
                    client_id: this.UNSPLASH_ACCESS_KEY,
                }
            });
    
            let imageUrl = unsplashResponse.data.results[0]?.urls?.regular;
            
            if (!imageUrl) {
                console.warn('No image found for the exercise, using a placeholder');
                imageUrl = 'https://via.placeholder.com/500';
            } else {
                imageUrl = `${imageUrl}?w=500&h=500&fit=crop`;
            }

            return imageUrl;
        } catch (error) {
            console.error('Error fetching image from Unsplash:', error);
        }

    }
}

export default UnsplashApiHandler;