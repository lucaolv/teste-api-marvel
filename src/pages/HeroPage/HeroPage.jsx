import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterById, getCharacterComics } from '../../services/marvelApi';
import HeroHeader from '../../components/HeroHeader/HeroHeader';
import iconHeartFilled from '../../assets/icones/heart/Path Copy 7@1,5x.png';
import iconHeartOutline from '../../assets/icones/heart/Path Copy 2.png';
import './HeroPage.css';

const HeroPage = ({ favorites, onToggleFavorite }) => {
  const { heroId } = useParams();
  const [hero, setHero] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const heroData = await getCharacterById(heroId);
        setHero(heroData);
        const comicsData = await getCharacterComics(heroId);
        setComics(comicsData.results);
        setError(null);
      } catch (err) {
        setError('Failed to fetch hero data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [heroId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!hero) return <div>Hero not found.</div>;

  const isFavorite = favorites.includes(hero.id);

  return (
    <>
      <HeroHeader />
      <div className="hero-page">
        <div className="hero-header">
          <img 
            src={`${hero.thumbnail.path.replace('http://', 'https://')}.${hero.thumbnail.extension}`}
            alt={hero.name} 
            className="hero-image"
          />
          <div className="hero-info">
            <div className="hero-title">
              <h1>{hero.name}</h1>
              <img 
                src={isFavorite ? iconHeartFilled : iconHeartOutline}
                alt="Favoritar"
                className="fav-icon-hero"
                onClick={() => onToggleFavorite(hero.id)}
              />
            </div>
            <p>{hero.description || 'No description available.'}</p>
          </div>
        </div>

        <div className="hero-comics">
          <h2>Comics</h2>
          <div className="comics-list">
            {comics.map(comic => (
              <div key={comic.id} className="comic-item">
                <img 
                  src={`${comic.thumbnail.path.replace('http://', 'https://')}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="comic-image"
                />
                <p className="comic-title">{comic.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;