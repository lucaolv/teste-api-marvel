import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacterById, getCharacterComics } from '../../services/marvelApi';
import HeroHeader from '../../components/HeroHeader/HeroHeader';

import './HeroPage.css';

import iconHeartFilled from '../../assets/icones/heart/Path Copy 7@1,5x.png';
import iconHeartOutline from '../../assets/icones/heart/Path Copy 2.png';
import iconBook from '../../assets/icones/book/Group.png';
import iconVideo from '../../assets/icones/video/Shape.png';
import iconRatingFull from '../../assets/review/Group 4.png';

const formatDate = (dateString) => {
  if (!dateString) return 'Data indisponível';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
  } catch {
    return 'Data inválida';
  }
};

function HeroPage({ favorites, onToggleFavorite }) {
  const { heroId } = useParams();
  const [hero, setHero] = useState(null);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const heroData = await getCharacterById(heroId);
        setHero(heroData);
        const comicsData = await getCharacterComics(heroId);
        setComics(comicsData.results);
      } catch (err) {
        console.error("Erro ao buscar dados do herói:", err);
        if (err.response && err.response.status === 409) {
          setError("Erro de autenticação com a API Marvel (409 Conflict).");
        } else {
          setError("Não foi possível carregar os dados do herói.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, [heroId]);


  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!hero) return <div>Herói não encontrado.</div>;

  const isFavorite = favorites.includes(parseInt(heroId, 10));

  const imageUrl = `${hero.thumbnail.path.replace('http://', 'https://')}.${hero.thumbnail.extension}`;
  const isImageAvailable = !hero.thumbnail.path.includes('image_not_available');

  // Encontra a data do último quadrinho (o primeiro da lista ordenada)
  const lastComicDate = comics.length > 0 ? comics[0].dates?.find(date => date.type === 'onsaleDate')?.date : null;

  return (
    <div className="hero-page-wrapper">
      <div className='app-container'>
        <HeroHeader />
        <div className="hero-page">
          <div className="hero-main-section">

            <div className="hero-info-left">
              <div className="hero-title">
                <h1>{hero.name.toUpperCase()}</h1>
                <img
                  src={isFavorite ? iconHeartFilled : iconHeartOutline}
                  alt="Favoritar"
                  className="fav-icon-hero"
                  onClick={() => onToggleFavorite(hero.id)}
                />
              </div>
              <p className="hero-description">
                {hero.description || "Descrição não disponível."}
              </p>

              <div className="hero-stats">
                <div className="stat-item">
                  <span>Quadrinhos</span>
                  <div className="stat-value">
                    <img src={iconBook} alt="Quadrinhos" className="stat-icon" />
                    <strong>{hero.comics?.available || 0}</strong>
                  </div>
                </div>
                <div className="stat-item">
                  <span>Filmes</span>
                  <div className="stat-value">
                    <img src={iconVideo} alt="Filmes" className="stat-icon" />
                    <strong>{hero.series?.available || 0}</strong>
                  </div>
                </div>
              </div>

              <div className="hero-sub-info">
                <div className="rating">
                  <strong>Rating:</strong>
                  <img src={iconRatingFull} alt="Rating 4/5" className="rating-stars" />
                </div>
                <div className="last-comic">
                  <strong>Último quadrinho:</strong>
                  <span>{formatDate(lastComicDate)}</span>
                </div>
              </div>
            </div>

            <div className="hero-image-right">
              {isImageAvailable ? (
                <img src={imageUrl} alt={hero.name} className="hero-image" />
              ) : (
                <div className="hero-image-placeholder">?</div>
              )}
            </div>

          </div>

          <div className="comics-section">
            <h2>Últimos lançamentos</h2>
            <div className="comics-list">
              {comics.length > 0 ? (
                comics.map(comic => (
                  <div key={comic.id} className="comic-item">
                    <img
                      src={`${comic.thumbnail.path.replace('http://', 'https://')}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                      className="comic-image" // Renomeado para evitar conflito
                    />
                    <p className="comic-title">{comic.title}</p>
                  </div>
                ))
              ) : (
                <p>Nenhum quadrinho recente encontrado.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HeroPage;