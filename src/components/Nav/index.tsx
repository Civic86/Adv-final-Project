import React from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  return (
    <Box bg="#5AC9A1" display="flex" alignItems="center" justifyContent="space-evenly" width='100%' pos="fixed" bottom="0" py={2} overflow='visible'>
        <Link href="/">
        <Image
        src="/images/homeIcon.svg"
        width={70}
        height={70}
        alt='homeIcon'
      />
        </Link>

        <Image
        src="/images/logo.svg"
        width={75}
        height={75}
        alt=''
        />
      <Link href="/pokedex">
      <Image
        src="/images/bookIcon.svg"
        width={70}
        height={70}
        alt='bookIcon'
      />
      </Link>
    </Box>
  );
};

export default Nav;

