import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
    reducerPath:'shazamCoreApi',
    tagTypes:['TopCharts'],
    baseQuery:fetchBaseQuery({
        baseUrl:'https://shazam.p.rapidapi.com',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key','7c7390c5d0mshda3f3caab7adf54p15e727jsn96cb8fd74f81');
            headers.set('X-RapidAPI-Host','shazam.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints:( builder)=> {
       
        return {
            getTopCharts:builder.query({query:()=>'/charts/track'}),
            getTopChartsByGenre:builder.query({query:(genre)=>`/charts/track?listId=genre-global-chart-${genre ? genre : 1}`}),
            getSongDetails:builder.query({query:(songKey)=> `/songs/get-details?key=${songKey}`}),
            getRelatedSong:builder.query({query:(songKey)=>`/songs/list-recommendations?key=${songKey}`}),
            getArtistDetails:builder.query({query:(artistId) => `/artists/get-details?id=${artistId}`}),
            getArtistTopSongs:builder.query({query:(artistId) => `/artists/get-top-songs?id=${artistId}`}),
            getAroundYouSongs:builder.query({query:(countryCode)=> `/charts/track?listId=ip-country-chart-${countryCode}`}),
            searchSongs: builder.query({query:(term)=> `/search?term=${term}`})
        }
    }
    
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetRelatedSongQuery,
    useGetArtistDetailsQuery,
    useGetArtistTopSongsQuery,
    useGetAroundYouSongsQuery,
    useGetTopChartsByGenreQuery,
    useSearchSongsQuery
} = shazamCoreApi;

