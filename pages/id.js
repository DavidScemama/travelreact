import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const VoyageDetail = () => {
 
  const [voyage, setVoyage] = useState({});
  const router = useRouter();


  const { id } = router.query;


  const fetchVoyageDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/voyages/${id}`);
      setVoyage(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du voyage', error);
    }
  };

 
  useEffect(() => {
    if (id) {
      fetchVoyageDetail();
    }
  }, [id]);

  return (
    <div>
      <h2>{voyage.titre}</h2>
      <p>{voyage.description}</p>
      <p>Lieu : {voyage.lieu}</p>
    </div>
  );
};

export default VoyageDetail;
