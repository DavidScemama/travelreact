import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateVoyageForm from '../components/CreateVoyageForm';
import Link from 'next/link';

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

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un voyage..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />

      <CreateVoyageForm onVoyageCreated={handleVoyageCreated} />

     
      <ul>
        {filteredVoyages.map(voyage => (
          <li key={voyage.id}>
            <Link href="/show/[id]" as={`/show/${voyage.id}`}>
              <div>{voyage.titre}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
