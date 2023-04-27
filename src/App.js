import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

//Functional components
const App = ()=>{

  const [searchFiled, setSearchFiled] = useState('') //[value,setvalue]

  const [monsters,setmonsters] = useState([])

  const [filteredMonsters, setFiltermonsters] = useState(monsters)

  useEffect(()=>{

    fetch('https://jsonplaceholder.typicode.com/users')
     .then((response)=>response.json())
     .then((users)=> setmonsters(users))

  },[])

  useEffect(()=>{
    const newfilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchFiled);
 })

  setFiltermonsters(newfilteredMonsters)
  },[monsters,searchFiled])


  const onSearchChange = (event)=>{
        const searchFiledString = event.target.value.toLocaleLowerCase()
        setSearchFiled(searchFiledString)
      }

  

  return(
    <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox 
          className = 'monsters-search-box'
          onChangeHandler = {onSearchChange} 
          placeholder = 'search-monsteers' 
          />

        <CardList monsters={filteredMonsters}/>
      </div>
  )
}

// class App extends Component {

//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchFiled: ''
      
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//      .then((response)=>response.json())
//      .then((users)=> this.setState(()=>{
//       return {monsters: users}
//      },
//      ()=>{
      
//      }))
//   }

//   onSearchChange = (event)=>{
//     const searchFiled = event.target.value.toLocaleLowerCase()

//     this.setState(()=>{
//       return {searchFiled}
//     })
//   }

//   render(){

//     const {monsters, searchFiled} = this.state
//     const {onSearchChange} = this

//     const filteredMonsters = monsters.filter((monster)=>{
//       return monster.name.toLocaleLowerCase().includes(searchFiled);
//     })

//     return (
//       <div className="App">
//         {/* <input className='search-box' type='search' placeholder='search monsters' 
//         onChange={onSearchChange}/> */}
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox 
//           onChangeHandler = {onSearchChange} 
//           placeholder = 'search-monsteers' 
//           className = 'monsters-search-box'
//           />
//         {/* {
//           filteredMonsters.map((monster)=>{
//             return (
//                <div key={monster.id}>
//               <h1>{monster.name}</h1>
//               </div>
//             );
//           })
//         } */}

//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;
