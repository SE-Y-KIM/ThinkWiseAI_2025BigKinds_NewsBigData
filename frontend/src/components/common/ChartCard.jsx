import React from 'react';
import './ChartCard.css';

const ChartCard = ({
  title,
  subtitle,
  value,
  change,
  changeType = 'neutral', // 'positive', 'negative', 'neutral'
  chart,
  loading = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClass = 'chart-card';
  const loadingClass = loading ? 'chart-card--loading' : '';
  const clickableClass = onClick ? 'chart-card--clickable' : '';
  
  const cardClass = `${baseClass} ${loadingClass} ${clickableClass} ${className}`.trim();

  const renderChange = () => {
    if (!change) return null;
    
    const changeClass = `chart-card__change chart-card__change--${changeType}`;
    const changeIcon = changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→';
    
    return (
      <div className={changeClass}>
        <span className="chart-card__change-icon">{changeIcon}</span>
        <span className="chart-card__change-value">{change}</span>
      </div>
    );
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className="chart-card__chart chart-card__chart--loading">
          <div className="chart-card__loading-skeleton"></div>
        </div>
      );
    }
    
    return chart ? (
      <div className="chart-card__chart">
        {chart}
      </div>
    ) : null;
  };

  return (
    <div 
      className={cardClass}
      onClick={onClick}
      {...props}
    >
      <div className="chart-card__header">
        <div className="chart-card__title-section">
          <h3 className="chart-card__title">{title}</h3>
          {subtitle && <p className="chart-card__subtitle">{subtitle}</p>}
        </div>
        {renderChange()}
      </div>
      
      {value && (
        <div className="chart-card__value">
          {loading ? (
            <div className="chart-card__loading-skeleton chart-card__loading-skeleton--value"></div>
          ) : (
            value
          )}
        </div>
      )}
      
      {renderChart()}
    </div>
  );
};

export default ChartCard;

