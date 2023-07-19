import React, { useState } from 'react';
import axios from 'axios';

const CreateVoyageForm = ({ onVoyageCreated }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    lieu: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/voyages', formData);
      onVoyageCreated(response.data);
      setFormData({
        titre: '',
        description: '',
        lieu: ''
      });
    } catch (error) {
      console.error('Erreur lors de la création du voyage', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre:
        <input type="text" name="titre" value={formData.titre} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </label>
      <label>
        Lieu:
        <input type="text" name="lieu" value={formData.lieu} onChange={handleChange} />
      </label>
      <button type="submit">Créer Voyage</button>
    </form>
  );
};

export default CreateVoyageForm;
