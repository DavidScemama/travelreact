// pages/VoyageDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const VoyageDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [voyage, setVoyage] = useState(null);

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

  // Gérer la suppression du voyage
  const handleVoyageDeleted = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/voyages/${id}`);
      router.push('/'); // Rediriger vers la page d'accueil après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du voyage', error);
    }
  };

  if (!voyage) {
    // Si le voyage n'est pas encore chargé, on retourne une chaîne vide pour éviter d'afficher le "Loading..."
    return null;
  }

  return (
    <div>
      <h2>{voyage.titre}</h2>
      <p>{voyage.description}</p>
      <p>Lieu : {voyage.lieu}</p>
      {/* Bouton pour supprimer le voyage */}
      <button onClick={() => handleVoyageDeleted(voyage.id)}>Supprimer ce voyage</button>
    </div>
  );
};

export default VoyageDetails;
