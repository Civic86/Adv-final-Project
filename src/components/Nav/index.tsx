import React from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  return (
    <Box bg="#5AC9A1" display="flex" alignItems="center" justifyContent="space-evenly" width='100vw' pos="fixed" bottom="0" >
        <Link href="/">
        <Image
        src="/images/homeIcon.svg"
        width={75}
        height={75}
        alt='homeIcon'
      />
        </Link>
      
      <Link href="/pokedex">
      <Image
        src="/images/bookIcon.svg"
        width={75}
        height={75}
        alt='bookIcon' 
      />
      </Link>
    </Box>
  );
};

export default Nav;

