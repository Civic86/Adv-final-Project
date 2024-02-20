import React from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  return (
    <Box bg="blue.100" display="flex" alignItems="center" justifyContent="space-evenly">
        <Link href="/">
        <Image
        src="/images/homeIcon.png"
        width={75}
        height={75}
        alt='homeIcon'
      />
        </Link>
      
      <Image
        src="/images/bookIcon.png"
        width={75}
        height={75}
        alt='bookIcon' 
      />
    </Box>
  );
};

export default Nav;

