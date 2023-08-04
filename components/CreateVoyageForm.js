import React, { useState } from 'react';
import axios from 'axios';

const CreateVoyageForm = ({ onVoyageCreated }) => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const image = await fetchImageByLocation(lieu);
    setImageURL(image);

  
    try {
      const newVoyage = {
        titre,
        description,
        lieu,
        imageURL: image, 
      };

      const response = await axios.post('http://localhost:5000/voyages', newVoyage);
      onVoyageCreated(response.data);

    
      setTitre('');
      setDescription('');
      setLieu('');
      setImageURL(''); 
    } catch (error) {
      console.error('Erreur lors de la création du voyage', error);
    }
  };

  const fetchImageByLocation = async (location) => {
    const response = await axios.get(`https://api.unsplash.com/photos/random?query=${location}&client_id=USTHmL9rpRzvXvVWEu4HYQ83BKm7Vf1QR4XAZFtCBik`);
    return response.data.urls.regular;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className='CreateForm'
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <input
       className='CreateForm'
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className='CreateForm'
        type="text"
        placeholder="Lieu"
        value={lieu}
        onChange={(e) => setLieu(e.target.value)}
      />
      <button className='Addbutton'type="submit">Ajouter le voyage</button>
    </form>
  );
};

export default CreateVoyageForm;
