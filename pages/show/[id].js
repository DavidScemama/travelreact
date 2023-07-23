import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const VoyageDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [voyage, setVoyage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');

  // Fonction pour récupérer les détails du voyage depuis l'API REST locale
  const fetchVoyageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/voyages/${id}`);
      setVoyage(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du voyage', error);
    }
  };

  // Utilisez useEffect pour charger les détails du voyage au chargement de la page
  useEffect(() => {
    if (id) {
      fetchVoyageDetails();
    }
  }, [id]);

  // Gérer le mode édition
  const toggleEditing = () => {
    setEditing(prevEditing => !prevEditing);
  };

  // Gérer la mise à jour du voyage
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
        <div className='blocshow'>
          <h2>{voyage.titre}</h2>
          <p>Description : {voyage.description}</p>
          <p>Lieu : {voyage.lieu}</p>
          <Link href={`/edit/${voyage.id}`}>
            <button>Modifier ce voyage</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VoyageDetails;
