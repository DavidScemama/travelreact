import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import EditVoyageForm from '../../components/EditVoyageForm';
import Link from 'next/link';


const VoyageDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [voyage, setVoyage] = useState(null);

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

  const handleUpdateVoyage = (updatedVoyage) => {
    setVoyage(updatedVoyage);
  };

  if (!voyage) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{voyage.titre}</h2>
      <p>{voyage.description}</p>
      <p>Lieu : {voyage.lieu}</p>

      <Link legacyBehavior href={`/edit/${voyage.id}`}>
        <a>Editer ce voyage</a>
      </Link>

      <EditVoyageForm voyage={voyage} onUpdate={handleUpdateVoyage} />
    </div>
  );
};

export default VoyageDetails;
