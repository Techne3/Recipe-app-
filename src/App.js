import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {

  const YOUR_APP_ID = 'c07e5293';
  const YOUR_APP_KEY = '7d9631c248810f01ab683c221927f0f2'
  // const exampleReq =`https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`

  const [recipes , setRecipes] = useState([]);
  const [search, setSearch] = useState ('');
  const [query, setQuery] = useState('chicken')

  useEffect ( ( ) => {
    getsRecipes();
    // console.log('effect has been run')
    // console.log("lets say we are fetching data")
  },[query])

  const getsRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
    const data = await response.json();
    console.log(data.hits)
    
    setRecipes(data.hits);

  };
  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className = "App">
      <form onSubmit={getSearch} className="search-form" >
         <input className="search-bar" type= "text" value={search} onChange={updateSearch}></input>
        <button className="search-button" type = "submit"> Search </button>
      </form>
        <div className="recipes">
       {
         recipes.map (recipe => (

         <Recipe
         key = {recipe.recipe.label}
         title = {recipe.recipe.label}
         calories={recipe.recipe.calories}
         image = {recipe.recipe.image}
         ingredients = {recipe.recipe.ingredients}


         />

         ))
       }
      </div>
    </div>


)

}

{/* <h1 onClick={()=> setCounter(counter+1) }>{counter}</h1> */}
export default App;
