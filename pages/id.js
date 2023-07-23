import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const VoyageDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [voyage, setVoyage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);


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


  const toggleEditing = () => {
    setEditing(prevEditing => !prevEditing);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedVoyage = { titre, description, lieu };
      const response = await axios.put(
        `http://localhost:5000/voyages/${id}`,
        updatedVoyage
      );
      setVoyage(response.data);
      toggleEditing();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du voyage', error);
    }
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/voyages/${id}`);
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la suppression du voyage', error);
    }
  };

  
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  
  const handleHideConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  if (!voyage) {
    return null;
  }

  return (
    <div>
      {editing ? (
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
      ) : (
        <div>
          <h2>{voyage.titre}</h2>
          <p>{voyage.description}</p>
          <p>Lieu : {voyage.lieu}</p>

          <button onClick={toggleEditing}>Modifier ce voyage</button>
          <button onClick={handleShowConfirmationModal}>Supprimer ce voyage</button>

          {showConfirmationModal && (
            <div>
              <p>Êtes-vous sûr de vouloir supprimer ce voyage ?</p>
              <button onClick={handleDelete}>Oui</button>
              <button onClick={handleHideConfirmationModal}>Non</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoyageDetails;
