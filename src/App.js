// import { Component } from "react";
import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = function () {
  const [seacrhField, setSeacrhField] = useState(""); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  const onSearchChange = (e) => {
    const seacrhFieldString = e.target.value.toLocaleLowerCase();
    setSeacrhField(seacrhFieldString);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(seacrhField);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, seacrhField]);

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        className="monsters-search-box"
        placeholder="search-monsters"
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

//#region Class Component

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       seacrhField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   onSearchChange = (e) => {
//     const seacrhField = e.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { seacrhField };
//     });
//   };

//   render() {
//     const { monsters, seacrhField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(seacrhField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           className="monsters-search-box"
//           placeholder="search-monsters"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

//#endregion

export default App;
