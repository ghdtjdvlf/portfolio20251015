import { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';
import { SearchResult } from '../types/kakao';

interface KakaoMapProps {
  onPlaceSelect?: (place: SearchResult) => void;
}

const KakaoMap: FC<KakaoMapProps> = ({ onPlaceSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !window.kakao) return;

    const kakao = window.kakao;

    // Create map
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // Seoul City Hall
      level: 3,
    };

    const mapInstance = new kakao.maps.Map(mapContainer.current, options);
    setMap(mapInstance);

    // Create marker
    const markerInstance = new kakao.maps.Marker({
      position: mapInstance.getCenter(),
    });
    markerInstance.setMap(mapInstance);
    setMarker(markerInstance);
  }, []);

  // Search places
  const handleSearch = () => {
    if (!map || !searchKeyword.trim()) return;

    setIsSearching(true);
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data: any, status: any) => {
      setIsSearching(false);

      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
      } else {
        alert('검색 결과가 없습니다.');
        setSearchResults([]);
      }
    });
  };

  // Handle place selection
  const handlePlaceClick = (place: SearchResult) => {
    if (!map || !marker) return;

    const kakao = window.kakao;
    const position = new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x));

    // Move map and marker
    map.setCenter(position);
    marker.setPosition(position);

    // Clear search results
    setSearchResults([]);
    setSearchKeyword(place.place_name);

    // Callback
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInputWrapper>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="장소, 주소 검색"
          />
          {searchKeyword && (
            <ClearButton onClick={() => { setSearchKeyword(''); setSearchResults([]); }}>
              ✕
            </ClearButton>
          )}
        </SearchInputWrapper>
        <SearchButton onClick={handleSearch} disabled={isSearching}>
          {isSearching ? '검색중...' : '검색'}
        </SearchButton>
      </SearchContainer>

      {searchResults.length > 0 && (
        <ResultsContainer>
          <ResultsTitle>검색 결과 ({searchResults.length})</ResultsTitle>
          <ResultsList>
            {searchResults.map((place, index) => (
              <ResultItem key={index} onClick={() => handlePlaceClick(place)}>
                <PlaceName>{place.place_name}</PlaceName>
                <PlaceAddress>{place.road_address_name || place.address_name}</PlaceAddress>
                {place.category_name && (
                  <PlaceCategory>{place.category_name.split(' > ').pop()}</PlaceCategory>
                )}
              </ResultItem>
            ))}
          </ResultsList>
        </ResultsContainer>
      )}

      <MapContainer ref={mapContainer} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 8px;
  width: 90%;
  max-width: 500px;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SearchIcon = styled.div`
  padding: 0 16px;
  font-size: 18px;
  opacity: 0.6;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 48px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: ${theme.colors.text};

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`;

const ClearButton = styled.button`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border: none;
  background: ${theme.colors.surfaceSecondary};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.borderLight};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SearchButton = styled.button`
  padding: 0 24px;
  height: 48px;
  border: none;
  background: ${theme.colors.primary};
  color: white;
  border-radius: ${theme.borderRadius.lg};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    background: #005cbf;
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsContainer = styled.div`
  position: absolute;
  top: 76px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 90%;
  max-width: 500px;
  max-height: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ResultsTitle = styled.div`
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  border-bottom: 1px solid ${theme.colors.borderLight};
  background: rgba(249, 249, 249, 0.8);
`;

const ResultsList = styled.div`
  max-height: 350px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.borderLight};
    border-radius: 4px;
  }
`;

const ResultItem = styled.div`
  padding: 14px 16px;
  cursor: pointer;
  transition: background ${theme.transitions.fast};
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);

  &:hover {
    background: rgba(0, 122, 255, 0.08);
  }

  &:active {
    background: rgba(0, 122, 255, 0.12);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PlaceName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 4px;
`;

const PlaceAddress = styled.div`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`;

const PlaceCategory = styled.div`
  display: inline-block;
  font-size: 11px;
  color: ${theme.colors.primary};
  background: rgba(0, 122, 255, 0.08);
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.sm};
  font-weight: 500;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

export default KakaoMap;
