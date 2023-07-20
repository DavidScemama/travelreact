// pages/index.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateVoyageForm from '../components/CreateVoyageForm';
import Link from 'next/link';

const Homepage = () => {
  // Utilisez l'état local pour stocker la liste des voyages
  const [voyages, setVoyages] = useState([]);

  // Utilisez l'état local pour stocker le texte du champ de recherche
  const [searchText, setSearchText] = useState('');

  // Fonction pour récupérer les données des voyages depuis l'API REST locale
  const fetchVoyages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/voyages');
      setVoyages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des voyages', error);
    }
  };

  // Utilisez useEffect pour charger les voyages au chargement de la page
  useEffect(() => {
    fetchVoyages();
  }, []);

  // Filtrer les voyages en fonction du texte de recherche
  const filteredVoyages = voyages.filter((voyage) =>
    voyage.titre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Gérer la création d'un nouveau voyage
  const handleVoyageCreated = (newVoyage) => {
    setVoyages([...voyages, newVoyage]);
  };

  // Gérer la suppression d'un voyage
  const handleVoyageDeleted = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/voyages/${id}`);
      fetchVoyages(); // Rafraîchir la liste des voyages après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du voyage', error);
    }
  };

  return (
    <div>
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher un voyage..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Formulaire de création */}
      <CreateVoyageForm onVoyageCreated={handleVoyageCreated} />

      {/* Liste des voyages filtrée */}
      <ul>
        {filteredVoyages.map((voyage) => (
          <li key={voyage.id}>
            {/* Lien vers la page de détails du voyage */}
            <Link href="/show/[id]" as={`/show/${voyage.id}`}>
              <div>{voyage.titre}</div>
            </Link>
            {/* Bouton pour supprimer le voyage */}
            <button onClick={() => handleVoyageDeleted(voyage.id)}>Supprimer ce voyage</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
