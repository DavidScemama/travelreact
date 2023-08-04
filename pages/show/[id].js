import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

const VoyageDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [voyage, setVoyage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');
  const [carouselImages, setCarouselImages] = useState([]);

  const fetchVoyageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/voyages/${id}`);
      setVoyage(response.data);
      fetchImages(response.data.lieu);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du voyage', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVoyageDetails();
    }
  }, [id]);

  const toggleEditing = () => {
    setEditing((prevEditing) => !prevEditing);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedVoyage = { titre, description, lieu };
      const response = await axios.put(
        `http://localhost:5000/voyages/${id}`,
        updatedVoyage
      );
      setVoyage(response.data);
      toggleEditing();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du voyage', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce voyage ?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/voyages/${id}`);
        router.push('/');
      } catch (error) {
        console.error('Erreur lors de la suppression du voyage', error);
      }
    }
  };

  const fetchImages = async (location) => {
    try {
      const unsplashAccessKey = 'USTHmL9rpRzvXvVWEu4HYQ83BKm7Vf1QR4XAZFtCBik';
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${location}&client_id=${unsplashAccessKey}`
      );
      setCarouselImages(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la récupération des images', error);
    }
  };

  if (!voyage) {
    return null;
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lieu"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
          />
          <button type="submit">Mettre à jour</button>
        </form>
      ) : (
        <div className="blocshow">
          <h2>{voyage.titre}</h2>
          <p>Description : {voyage.description}</p>
          <p>Lieu : {voyage.lieu}</p>
          <Link href={`/edit/${voyage.id}`}>
            <button>Modifier ce voyage</button>
          </Link>
          <button type="button" onClick={handleDelete}>
            Supprimer ce voyage
          </button>
        </div>
      )}
      <Carousel>
        {carouselImages.map((image, index) => (
          <div key={index}>
            <img src={image.urls.regular} alt={voyage.lieu} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default VoyageDetails;
