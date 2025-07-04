import React, { useState, useMemo } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';

const RecipesPage: React.FC = () => {
  const { recetas } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  // Obtener categorías únicas
  const categories = useMemo(() => {
    return Array.from(new Set(recetas.map(receta => receta.categoria)));
  }, [recetas]);

  // Filtrar recetas basado en los criterios
  const filteredRecetas = useMemo(() => {
    return recetas.filter(receta => {
      const matchesSearch = receta.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        receta.ingredientes.some(ingrediente =>
          ingrediente.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === '' || 
        receta.categoria === selectedCategory;
      
      const matchesDifficulty = selectedDifficulty === '' || 
        receta.dificultad === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [recetas, searchTerm, selectedCategory, selectedDifficulty]);

  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1 className="page-title">📖 Todas las Recetas</h1>
        <p className="page-subtitle">
          Descubre recetas deliciosas y fáciles de preparar
        </p>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onDifficultyChange={(value) => setSelectedDifficulty(value.toLowerCase())}
        categories={categories}
      />

     {(selectedCategory || selectedDifficulty || searchTerm) && (
        <p className="active-filters">
          <strong>Filtros activos:</strong>
          {searchTerm && <> 🔍 "{searchTerm}"</>}
          {selectedCategory && <> • Categoría: {selectedCategory}</>}
          {selectedDifficulty && <> • Dificultad: {selectedDifficulty}</>}
        </p>
      )}

      <div className="results-info">
        <p className="results-count">
          {filteredRecetas.length === recetas.length 
            ? `Mostrando todas las ${recetas.length} recetas`
            : `Mostrando ${filteredRecetas.length} de ${recetas.length} recetas`
          }
        </p>
      </div>

      {filteredRecetas.length === 0 ? (
        <div className="no-results">
          <h3>😔 No se encontraron recetas</h3>
          <p>Intenta cambiar los filtros o términos de búsqueda</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setSelectedDifficulty('');
            }}
            className="clear-filters-btn"
          >
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <div className="recipes-grid">
          {filteredRecetas.map(receta => (
            <RecipeCard key={receta.id} recipe={receta} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;