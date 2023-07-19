// components/EditVoyageForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditVoyageForm = ({ id, onUpdate }) => {
  const router = useRouter();
  const [voyage, setVoyage] = useState(null);
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

  useEffect(() => {
    if (voyage) {
      setTitre(voyage.titre);
      setDescription(voyage.description);
      setLieu(voyage.lieu);
    }
  }, [voyage]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedVoyage = { titre, description, lieu };
      const response = await axios.put(
        `http://localhost:5000/voyages/${id}`,
        updatedVoyage
      );
      onUpdate(response.data);
      // Naviguer vers la page d'accueil après la mise à jour
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du voyage', error);
    }
  };

  if (!voyage) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default EditVoyageForm;
