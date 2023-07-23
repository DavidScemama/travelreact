// components/EditVoyageForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/style.css';


const EditVoyageForm = ({ id, onUpdate }) => {
  const router = useRouter();
  const [voyage, setVoyage] = useState(null);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');

  const fetchVoyageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/voyages/${id}`);
      setVoyage(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du voyage', error);
    }
  };

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
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du voyage', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce voyage ?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/voyages/${id}`);
        onUpdate(); 
        router.push('/'); 
      } catch (error) {
        console.error('Erreur lors de la suppression du voyage', error);
      }
    }
  };

  if (!voyage) {
    return null;
  }

  return (
    <div>
      <h1>Modifiez ce voyage</h1>
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <input
        type="text"
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

      <button type="button" onClick={handleDelete}>
        Supprimer ce voyage
      </button>
      </form>
      </div>
  );
};

export default EditVoyageForm;
