import React from 'react';
import './App.css';
import contacts from './contacts.json'

class App extends React.Component {

  state = {
    contactsList: []
  }

  getContactList = () => {
    let copyList = contacts.slice(0, 5)

    copyList.forEach((contact) => {
      let contactName = contact.name
      let arrayName = contactName.split(' ')
      let contactFullName = arrayName.join('_')

      contact.wikiUrl = `https://en.wikipedia.org/wiki/${contactFullName}`
    })
    console.log(copyList)
    this.setState({contactsList: copyList})
  }

  addRandomContact = () => {
    let randomContact = contacts[Math.floor(Math.random() * contacts.length)]
    let copyList = [...this.state.contactsList]

    let arrayName = randomContact.name.split(' ')
    let contactFullName = arrayName.join('_')

      if(!copyList.includes(randomContact)) {
        randomContact.wikiUrl = `https://en.wikipedia.org/wiki/${contactFullName}`
        copyList.unshift(randomContact)
      } else if (contacts.length === copyList.length) {
        return alert("¡Hey!\nThere are no more contacts in the list.\nNow you can sort the list by name or popularity.")
      } else {
        return this.addRandomContact()
      }

    this.setState({contactsList: copyList})
  }

  sortByName = () => {
    let sortedByNameList = [...this.state.contactsList]
    sortedByNameList.sort((a, b) => {
      if(a.name > b.name) {
        return 1
      } else if (a.name < b.name) {
        return -1
      }
      return 0
    })
    
    this.setState({contactsList: sortedByNameList})
  }

  sortByPopularity = () => {
    let sortedByPopularityList = [...this.state.contactsList]
    sortedByPopularityList.sort((a, b) => {
      return b.popularity - a.popularity
    })

    this.setState({contactsList: sortedByPopularityList})
  }

  deleteContact = (idx) => {
    let newList = [...this.state.contactsList]
    newList.splice(idx, 1)

    this.setState({contactsList: newList})
  }

  componentDidMount = () => {
    this.getContactList()
  }

  render() {
    return (
      <div className="App">
        <a className='link-repo' href='https://github.com/albacardona/Ironhack-REACT-IronContacts' target='_blank' rel="noopener noreferrer">Check the repo</a>
        
        <h1>IronContacts</h1>
          
          <div>
            <button className="btn" onClick={this.addRandomContact}>Add Random Contact</button>
            <button className="btn" onClick={this.sortByName}>Sort by name</button>
            <button className="btn" onClick={this.sortByPopularity}>Sort by popularity</button>
          </div>


        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contactsList.map((contact, idx) => (
              <tr className='items-list' key= {idx}>
                <td><img src={contact.pictureUrl} alt={contact.name}></img></td>
                <td><a href={contact.wikiUrl} target='_blank' rel="noopener noreferrer">{contact.name}</a></td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td><button className="delete-btn" onClick={()=>this.deleteContact(idx)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default App
