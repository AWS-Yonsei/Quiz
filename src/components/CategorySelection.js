import React from 'react';

const CategorySelection = ({ onSelectCategory }) => {
  const styles = {
    container: {
      textAlign: 'center',
    },
    title: {
      fontSize: '2em',
      marginBottom: '20px',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    categoryButton: {
      cursor: 'pointer',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1.5em',
    },
  };

  const categories = ['당뇨병', '고혈압', '관절염', '심장병']; 
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>질환 극복하기</h1>
      <div style={styles.gridContainer}>
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => onSelectCategory(category)}
            style={styles.categoryButton}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;