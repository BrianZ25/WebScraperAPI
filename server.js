const express = require('express')
const request = request('request-promise')

const app = express();
const PORT = process.env.port || 5000;

const key = 'insert api key'
const URL = `http://api.scraperapi.com?api_key=${key}&autoparse=true`

app.use(express.json());

app.get('/',(req,res) => {
    res.send('API is running')
});

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await request(`{URL}&url=https://amazon.com/dp/${productId}`);
        res.json(JSON.parse(response))
    } catch(err){
        res.json(err)
    }
})

app.get('/search/searchQuery', async (req, res) => {
    const { search } = req.params;
    try {
        const response = await request(`${URL}&url=https://amazon.com/s?k=${search}`);
        res.json(JSON.parse(response))
    } catch(err){
        res.json(err)
    }
})

app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await request(`{URL}&url=https://amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response))
    } catch(err){
        res.json(err)
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));