/*

We get it from using rapid api using this link rapid api summarizer-> 
"https://rapidapi.com/restyler/api/article-extractor-and-summarizer?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=referral&utm_campaign=DevRel"


const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {
      url: 'https://time.com/6266679/musk-ai-open-letter/',
      length: '3'
    },
    headers: {
      'X-RapidAPI-Key': 'f329edfe49msh63c3e60029b190cp13fbb0jsnfa2a9b5978e5',//this is our rapid api secret key
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };


  */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        //base api is which api we want to call and for that we have to use rapid api and we get this using  option obj we get from rapid api
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        },
    }),

    
    // without the endpoints we will get an error saying that inject.endpoints is not an function basically it means that we successfully set our store but our article api still misses some stuff so it need to have endpoints
    endpoints: (builder) => ({//builder will help us to build endpoints
        getSummary: builder.query({

            // note articleUrl that we pass might sometimes contains special characters which are going to cause problems or error or in general unexpected behaviour in our app, "SO WHENEVER WE PASS SOMETHING IN THE URL WE WANT TO WRAP IT IN A FUNCTION CALLED ENCODE URI COMPONENT i.e "(encodeURIComponent(params.articleUrl))"

            //In short whenever we pass any user generated content into the url definitely we have to wrap it with encodeURIComponent() function
            
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,//url is required parameter check this in rapid api 
        }),
    }),
})

export const { useLazyGetSummaryQuery } = articleApi//this hook will fire on demand(i.e on hitting submit after entering the url) but not as soon 