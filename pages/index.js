// pages/index.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateVoyageForm from '../components/CreateVoyageForm';
import Link from 'next/link';
import styles from '../styles/style.css';

const Homepage = () => {
  const [voyages, setVoyages] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchVoyages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/voyages');
      setVoyages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des voyages', error);
    }
  };

  useEffect(() => {
    fetchVoyages();
  }, []);

  const filteredVoyages = voyages.filter(voyage =>
    voyage.titre.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleVoyageCreated = (newVoyage) => {
    setVoyages([...voyages, newVoyage]);
  };

  const handleDeleteVoyage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/voyages/${id}`);
      fetchVoyages(); // Fetch the updated list of voyages after deletion
    } catch (error) {
      console.error('Erreur lors de la suppression du voyage', error);
    }
  };

  // Function to show the alert modal
  const showAlertModal = (id) => {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?');
    if (confirmation) {
      handleDeleteVoyage(id);
    }
  };

  return (
    <div>
      <input
        className='search-bar'
        type="text"
        placeholder="Rechercher un voyage..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />

      {/* Formulaire de création */}
      <CreateVoyageForm onVoyageCreated={handleVoyageCreated} />

      {/* Liste des voyages filtrée */}
      <ul>
        {filteredVoyages.map(voyage => (
          <li key={voyage.id}>
            {/* Lien vers la page de détails du voyage */}
            <Link href="/show/[id]" as={`/show/${voyage.id}`}>
              <div>{voyage.titre}</div>
            </Link>
            <button onClick={() => showAlertModal(voyage.id)}>Supprimer ce voyage</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
