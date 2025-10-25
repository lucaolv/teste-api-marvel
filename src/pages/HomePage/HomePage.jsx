import { useState, useEffect } from 'react'
import { getCharacters, searchCharacters, getCharacterById } from '../../services/marvelApi' //

import Header from '../../components/Header/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterBar from '../../components/FilterBar/FilterBar'
import CharacterList from '../../components/CharacterList/CharacterList'

function HomePage({ favorites, onToggleFavorite }) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalFound, setTotalFound] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSortedAZ, setIsSortedAZ] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  // Efeito para buscar personagens da API
  useEffect(() => {
    if (showFavoritesOnly) return; // Não busca da API se estiver mostrando apenas favoritos

    setIsLoading(true)
    const fetchApi = async () => {
      try {
        let data
        if (searchTerm) {
          data = await searchCharacters(searchTerm, 0, 20)
        } else {
          // Se o toggle estiver ativado, ordena por nome
          data = await getCharacters(0, 20, isSortedAZ ? 'name' : null)
          console.log('Personagens da API:',
            data.results.map(char => ({
              id: char.id,
              name: char.name
            }))
          )
        }
        const results = data.results
        setCharacters(results)
        setTotalFound(data.total)
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    }

    const debounceFetch = setTimeout(fetchApi, 500)
    return () => clearTimeout(debounceFetch)

  }, [searchTerm, isSortedAZ, showFavoritesOnly])


  // Efeito para carregar dados completos dos favoritos
  useEffect(() => {
    const loadFavoriteCharacters = async () => {
      if (!showFavoritesOnly || favorites.length === 0) {
        setFavoriteCharacters([])
        return
      }

      setIsLoading(true)
      try {
        const promises = favorites.map(id => getCharacterById(id))
        const results = await Promise.all(promises)
        const validCharacters = results.filter(Boolean)
        setFavoriteCharacters(validCharacters)
      } catch (err) {
        console.error('Erro ao carregar favoritos:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavoriteCharacters()
  }, [showFavoritesOnly, favorites])


  const displayedCharacters = showFavoritesOnly
    ? favoriteCharacters
    : characters

  return (
    <div className="home-page">
      <Header />

      <div className="home-header">
        <h2>Explore o Universo</h2>
        <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
      </div>

      <SearchBar onSearch={setSearchTerm} />

      <FilterBar
        total={showFavoritesOnly ? displayedCharacters.length : totalFound}
        isSorted={isSortedAZ}
        onSortToggle={() => setIsSortedAZ(prev => !prev)}
        showFavorites={showFavoritesOnly}
        onFavoritesToggle={() => setShowFavoritesOnly(s => !s)}
      />

      {isLoading ? (
        <div className="loading">Carregando heróis...</div>
      ) : (
        <CharacterList
          characters={displayedCharacters}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  )
}

export default HomePage