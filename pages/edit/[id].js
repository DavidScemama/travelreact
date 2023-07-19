import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import EditVoyageForm from '../../components/EditVoyageForm';

const EditVoyagePage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchVoyageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/voyages/${id}`);
        if (!response.data) {
          router.push('/');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du voyage', error);
      }
    };

    fetchVoyageDetails();
  }, [id]);

  return (
    <div>
      {id && <EditVoyageForm id={id} />}
    </div>
  );
};

export default EditVoyagePage;
