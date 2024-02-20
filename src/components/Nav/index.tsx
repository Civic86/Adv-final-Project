import React from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  return (
    <Box bg="#5AC9A1" display="flex" alignItems="center" justifyContent="space-evenly" width='100vw' pos="fixed" bottom="0" py={2} overflow='visible'>
        <Link href="/">
        <Image
        src="/images/homeIcon.svg"
        width={70}
        height={70}
        alt='homeIcon'
        // style={{position:'absolute', bottom: 24}}
      />
        </Link>
        

      
      <Link href="/pokedex">
      <Image
        src="/images/bookIcon.svg"
        width={70}
        height={70}
        alt='bookIcon' 
        // style={{position:'absolute', bottom: 24}}
      />
      </Link>
    </Box>
  );
};

export default Nav;

