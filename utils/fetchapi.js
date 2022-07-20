import axios from 'axios';

export const baseUrl= 'https://bayut.p.rapidapi.com'
export const fetchApi =async(url)=>{
    const {data}=await axios.get((url),{
        headers: {
            'X-RapidAPI-Key': '7052670d60msha8274e31f65eee3p1c5c58jsn64c22183a3c1',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',            
          }   
    });
    return data;
}

