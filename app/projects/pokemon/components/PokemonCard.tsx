import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonListItem } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { data, isLoading } = usePokemon(pokemon.name);

  if (isLoading || !data) {
    return (
      <Card>
        <LoadingText>Loading...</LoadingText>
      </Card>
    );
  }

  const typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  const mainType = data.types[0].type.name;
  const backgroundColor = typeColors[mainType] || '#A8A878';

  return (
    <CardContainer onClick={() => setIsFlipped(!isFlipped)}>
      <CardInner isFlipped={isFlipped}>
        {/* 앞면 */}
        <CardFront bgColor={backgroundColor}>
          <PokemonImage
            src={data.sprites.other['official-artwork'].front_default}
            alt={data.name}
            loading="lazy"
          />
          <PokemonName>#{data.id} {data.name}</PokemonName>
          <TypeContainer>
            {data.types.map((type) => (
              <TypeBadge key={type.type.name} bgColor={typeColors[type.type.name]}>
                {type.type.name}
              </TypeBadge>
            ))}
          </TypeContainer>
        </CardFront>

        {/* 뒤면 - 상세 정보 */}
        <CardBack bgColor={backgroundColor}>
          <DetailTitle>{data.name}</DetailTitle>
          <DetailGrid>
            <DetailItem>
              <DetailLabel>Height:</DetailLabel>
              <DetailValue>{data.height / 10}m</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Weight:</DetailLabel>
              <DetailValue>{data.weight / 10}kg</DetailValue>
            </DetailItem>
          </DetailGrid>

          <Section>
            <SectionTitle>Abilities:</SectionTitle>
            {data.abilities.map((ability) => (
              <AbilityBadge key={ability.ability.name}>
                {ability.ability.name}
              </AbilityBadge>
            ))}
          </Section>

          <Section>
            <SectionTitle>Stats:</SectionTitle>
            {data.stats.map((stat) => (
              <StatRow key={stat.stat.name}>
                <StatName>{stat.stat.name}:</StatName>
                <StatBar>
                  <StatFill width={(stat.base_stat / 255) * 100} />
                </StatBar>
                <StatValue>{stat.base_stat}</StatValue>
              </StatRow>
            ))}
          </Section>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 400px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardFace = styled.div<{ bgColor: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 24px;
  background: ${props => props.bgColor};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardFront = styled(CardFace)`
  justify-content: center;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  overflow-y: auto;
  justify-content: flex-start;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const LoadingText = styled.div`
  color: #6b7280;
  font-size: 16px;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
`;

const PokemonName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-transform: capitalize;
  margin-top: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const TypeBadge = styled.span<{ bgColor: string }>`
  padding: 6px 16px;
  background: ${props => props.bgColor};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const DetailTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: white;
  text-transform: capitalize;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 12px;
  border-radius: 8px;
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4px;
`;

const DetailValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

const Section = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const AbilityBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 12px;
  font-size: 13px;
  margin: 4px;
  text-transform: capitalize;
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

const StatName = styled.span`
  font-size: 12px;
  color: white;
  text-transform: capitalize;
  width: 80px;
  flex-shrink: 0;
`;

const StatBar = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
`;

const StatFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background: white;
  transition: width 0.3s;
`;

const StatValue = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: white;
  width: 30px;
  text-align: right;
`;

export default PokemonCard;
