import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCharacters, searchCharacters, getCharacterById } from '../../services/marvelApi'

import Header from '../../components/Header/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterBar from '../../components/FilterBar/FilterBar'
import CharacterList from '../../components/CharacterList/CharacterList'
import Pagination from '../../components/Pagination/Pagination' // 1. Importar o novo componente

const PAGE_LIMIT = 20; // 2. Definir o limite de itens por página

function HomePage({ favorites, onToggleFavorite }) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalFound, setTotalFound] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSortedAZ, setIsSortedAZ] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // 3. Adicionar estado para a página atual
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCharacters = async (search = '') => {
    if (showFavoritesOnly) return;

    setIsLoading(true);
    try {
      let data;
      // 4. Calcular o offset com base na página atual
      const offset = (currentPage - 1) * PAGE_LIMIT;

      if (search) {
        // 5. Passar offset e limit para a busca
        data = await searchCharacters(search, offset, PAGE_LIMIT);
      } else {
        // 6. Passar offset e limit para a listagem geral
        data = await getCharacters(offset, PAGE_LIMIT, isSortedAZ ? 'name' : null);
      }
      setCharacters(data.results);
      setTotalFound(data.total);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  // Carrega os personagens iniciais e lê parâmetros da URL
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
      fetchCharacters(searchQuery);
    } else {
      fetchCharacters();
    }
    // 7. Adicionar currentPage como dependência do useEffect
  }, [isSortedAZ, showFavoritesOnly, searchParams, currentPage]);

  // Handler para a busca
  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchParams(term ? { search: term } : {});
    // 8. Resetar para a página 1 em toda nova busca
    setCurrentPage(1);
    fetchCharacters(term);
  };

  // 9. Resetar para a página 1 ao mudar filtros
  const handleSortToggle = () => {
    setCurrentPage(1);
    setIsSortedAZ(prev => !prev);
  };

  const handleFavoritesToggle = () => {
    setCurrentPage(1);
    setShowFavoritesOnly(s => !s);
  };


  // Efeito para carregar dados completos dos favoritos
  useEffect(() => {
    const loadFavoriteCharacters = async () => {
      if (!showFavoritesOnly || favorites.length === 0) {
        setFavoriteCharacters([])
        return
      }

      // ... (lógica de carregar favoritos existente) ...

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

  // 10. Calcular o total de páginas
  const totalPages = Math.ceil(totalFound / PAGE_LIMIT);

  return (
    <div className="home-page">
      <Header />

      <div className="home-header">
        <h2>Explore o Universo</h2>
        <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <FilterBar
        total={showFavoritesOnly ? displayedCharacters.length : totalFound}
        isSorted={isSortedAZ}
        onSortToggle={handleSortToggle} // Atualizado
        showFavorites={showFavoritesOnly}
        onFavoritesToggle={handleFavoritesToggle} // Atualizado
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

      {/* 11. Renderizar a paginação */}
      {!isLoading && !showFavoritesOnly && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default HomePage