import React, { useMemo } from 'react';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
  const { recetas } = useRecipes();

  const totalRecetas = recetas.length;

  const recetasPorCategoria = useMemo(() => {
    const conteo: Record<string, number> = {};
    recetas.forEach(receta => {
      conteo[receta.categoria] = (conteo[receta.categoria] || 0) + 1;
    });
    return conteo;
  }, [recetas]);

  const recetaMasPopular = useMemo(() => {
    return recetas.reduce((max, receta) => receta.valoracion > max.valoracion ? receta : max, recetas[0]);
  }, [recetas]);

  return (
    <div className="stats-page">
      <div className="page-header stats-header">
        <h1 className="page-title">📊 Estadísticas de Recetas</h1>
        <p className="page-subtitle">Un vistazo rápido a tu recetario</p>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon">📦</div>
          <div className="stat-number">{totalRecetas}</div>
          <div className="stat-label">Total de Recetas</div>
        </div>

        <div className="stats-card">
          <div className="stats-icon">📂</div>
          <div className="stat-number">{Object.keys(recetasPorCategoria).length}</div>
          <div className="stat-label">Categorías Distintas</div>
        </div>

        <div className="stats-card">
          <div className="stats-icon">🌟</div>
          <div className="stat-number">{recetaMasPopular.valoracion}/5</div>
          <div className="stat-label">Más Popular: {recetaMasPopular.nombre}</div>
        </div>
      </div>

      <div className="category-breakdown">
        <h2 className="section-title">📁 Recetas por Categoría</h2>
        <ul className="category-list">
          {Object.entries(recetasPorCategoria).map(([categoria, cantidad]) => (
            <li key={categoria} className="category-item">
              <span className="category-name">{categoria}: {cantidad}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsPage;
