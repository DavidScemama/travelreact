import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import EditVoyageForm from '../../components/EditVoyageForm';

const EditVoyagePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [updated, setUpdated] = useState(false);

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

    if (updated) {
      router.push('/');
    } else {
      fetchVoyageDetails();
    }
  }, [id, updated, router]);


  const handleUpdateVoyage = () => {
    setUpdated(true);
  };

  return (
    <div>
      {id && <EditVoyageForm id={id} onUpdate={handleUpdateVoyage} />}
    </div>
  );
};

export default EditVoyagePage;

