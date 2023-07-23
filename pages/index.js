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
      <div className='parent'>
      <img
        src="https://images.pexels.com/photos/2082949/pexels-photo-2082949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Remplacez cette URL par l'URL de votre image d'accueil
        alt="Image d'accueil"
        className='child1'
      />
      <input
        className='child2'
        type="text"
        placeholder="Rechercher un voyage..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        />
        <h1>Créez votre liste de voyage</h1>
      </div>

    
      <CreateVoyageForm
        className='formulaire'
        onVoyageCreated={handleVoyageCreated} />
    

      <ul>
        {filteredVoyages.map(voyage => (
          <li key={voyage.id}>
            <Link href="/show/[id]" as={`/show/${voyage.id}`}>
              <div className='voyagename'>{voyage.titre}</div>
            </Link>
            <p>{voyage.lieu}</p>
            <button onClick={() => showAlertModal(voyage.id)}>Supprimer ce voyage</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
