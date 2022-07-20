import Link from 'next/link';
import Image from 'next/image';
import { baseUrl,fetchApi } from '../utils/fetchapi';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import Property from '../component/Property';



const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, LinkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>

    <Image src={imageUrl} width={400} height={250} alt="banner" style={{borderRadius:'15px'}} />
    <Box p="25">
      <Text color="gray.500" fontSize="lg" fontWeight="bolder">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1} <br /> {title2}</Text>
      <Text color="gray.700" fontSize="lg" fontWeight="medium" paddingTop="3" paddingBottom="3" >{desc1}<br />{desc2}</Text>
      <Button fontSize="lg" bg="#007FFF" color="white" fontWeight="bold" style={{border:'none',borderRadius:'5px',height:'40px'}}>
        <Link href={LinkName}>{buttonText}</Link>
      </Button>
    </Box>

  </Flex>
)


export default function Home({propertiesforSale,propertiesforRent}) {
  //console.log(propertiesforSale,propertiesforRent); this is just to test the fetched data 
  return (
    <Box >     
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explorer Apartments , Villas,Homes"
        desc2="and more"
        buttonText="Explore Renting"
        LinkName="/search?purpose=for-rent"
        imageUrl="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg"
      />
      <Flex flexWrap="wrap" fontWeight='bold' color='gray'>
          {/*Fetch Data from api*/}
          {propertiesforRent.map((property)=> <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream House"
        desc1="Explorer Apartments , Villas,Homes"
        desc2="and more"
        buttonText="Explore Buying"
        LinkName="/search?purpose=for-sale"
        imageUrl="https://images.pexels.com/photos/8134847/pexels-photo-8134847.jpeg"
      />
      <Flex flexWrap="wrap" color='gray'>
          {/*Fetch Data from api*/}
          {propertiesforSale.map((property)=> <Property property={property} key={property.id}/>)}
      </Flex>
    </Box>
  )
} 

export async function getStaticProps(){
  //this will fetch the data from BayutApis
  const propertyforSale= await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyforRent= await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
  
  return{
    props:{     
      // this will return the fetched data to the home props
      propertiesforSale:propertyforSale?.hits,
      propertiesforRent:propertyforRent?.hits
    }
  }
}
