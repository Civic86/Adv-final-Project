import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  Image,
  Text,
  Button,
  Input,
  InputGroup,
  Stack,
  Box,
} from "@chakra-ui/react";
import Nav from "@/components/Nav";
import Link from "next/link";

interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
}

const pokemonCache = {};

export default function Pokedex(): JSX.Element {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 100;

  useEffect(() => {
    const fetchPokemons = async () => {
      if (offset > 649) {
        return;
      }

      if (pokemonCache[offset]) {
        setPokemons(pokemonCache[offset]);
        return;
      }

      const allPokemonData: any[] = [];
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      let data = await response.json();
      for (const pokemon of data.results) {
        if (offset + allPokemonData.length + 1 > 649) {
          break;
        }
        response = await fetch(pokemon.url);
        const pokemonData = await response.json();
        allPokemonData.push({
          name: pokemonData.name,
          id: pokemonData.id,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonData.id}.gif`,
        });
      }

      pokemonCache[offset] = allPokemonData;
      setPokemons(allPokemonData);
    };

    fetchPokemons();
  }, [offset]);

  const loadNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const loadPreviousPage = () => {
    const newOffset = Math.max(0, offset - limit);
    setOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div>
      <Stack
        px={40}
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
        flexDir={["column", "column", "row", "row"]}
        mt={10}
        mb={[10, 12, 16, 16]}
      >
        <Text fontSize={30} fontWeight={600} color="#5AC9A1">
          Pokedex
        </Text>
        <InputGroup w={[350, 500, 500, 500]}>
          <Input type="string" placeholder="Search by Pokemon name, id" />
        </InputGroup>
      </Stack>

      <SimpleGrid
        columns={[2, 3, 3, 5]}
        spacing={[7, 7, 7, 12]}
        px={[8, 12, 16, 20]}
      >
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} href={`/${pokemon.id}`} passHref>
            <Card
              as="a"
              w={[175, 175, 200, 250]}
              h={[130, 130, 140, 180]}
              position="relative"
              boxShadow="0 4px 8px 0 rgba(0,0,0,0.2), 4px 0 8px 0 rgba(0,0,0,0.2)"
            >
              <CardHeader>
                <Heading size={["sm", "sm", "md", "md"]}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Heading>
                <Text
                  fontWeight="bold"
                  color="gray"
                  fontSize={[10, 12, 16, 20]}
                >
                  #{pokemon.id}
                </Text>
              </CardHeader>
              <Image
                src={pokemon.imageUrl}
                alt={pokemon.name}
                boxSize={["110px", "120px", "120px", "140px"]}
                objectFit="none"
                transform={[
                  "scale(1.2)",
                  "scale(1.3)",
                  "scale(1.5)",
                  "scale(1.8)",
                ]}
                position="absolute"
                bottom="-1"
                right="-2"
              />
            </Card>
          </Link>
        ))}
      </SimpleGrid>

      <Box display="flex" justifyContent="center">
        {offset > 0 && (
          <Button mb={125} ml={50} mt={16} onClick={loadPreviousPage}>
            Load Previous 100 Pokémon
          </Button>
        )}

        {pokemons.length < 649 && (
          <Button mb={125} ml={50} mt={16} onClick={loadNextPage}>
            Load Next 100 Pokémon
          </Button>
        )}
      </Box>

      <Nav />
    </div>
  );
}
