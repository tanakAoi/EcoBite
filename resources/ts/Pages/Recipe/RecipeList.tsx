import React from 'react';

interface Recipe {
    id: number;
    title: string;
    description: string;
}

const recipes: Recipe[] = [
    { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
    { id: 2, title: 'Chicken Curry', description: 'A spicy and flavorful dish.' },
    { id: 3, title: 'Beef Stroganoff', description: 'A rich and creamy beef dish.' },
];

const RecipeList: React.FC = () => {
    return (
        <div>
            <h1>Recipe List</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;