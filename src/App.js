import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    topping: '',
    size: 'Small',
    vegetarian: true,
    id: null
  }


  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzasObj => this.setState({
      pizzas: pizzasObj
    }))
  }


  getPizzaToEdit = (pizza) => {
    this.setState({
      topping: pizza.topping,
      vegetarian: pizza.vegetarian ,
      size: pizza.size,
      id: pizza.id
    })
  }


  updateTopping = (topping) => {
    this.setState({
      topping: topping
    })
  }


  updateVegetarian = () => {
    this.setState({
      vegetarian: !this.state.vegetarian
    })
  }


  updateSize = (size) => {
    this.setState({
      size: size
    })
  }


  addPizza = (event) => {
    event.preventDefault()
    const {pizzas, vegetarian, size, topping} = this.state

    fetch('http://localhost:3000/pizzas', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        vegetarian: vegetarian,
        size: size,
        topping: topping
      })
    })
    .then(res => res.json())
    .then(pizzaToAdd => this.setState({
      pizzas: [pizzaToAdd, ...pizzas],
      vegetarian: true,
      size: 'Small',
      topping: '',
      id: null
    }))
  }


  updatePizza = (event) => {
    event.preventDefault()
    const {pizzas, id, size, topping, vegetarian} = this.state

    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        topping: topping,
        size: size,
        vegetarian: vegetarian
      })
    })
    .then(res => res.json())
    .then(pizzaToAdd => {
      const filteredPizzas = pizzas.filter(pizza => pizza.id !== id)
      this.setState({
        pizzas: [pizzaToAdd, ...filteredPizzas],
        vegetarian: true,
        size: 'Small',
        topping: '',
        id: null
      })
    })
  }


  submitPizza = (event) => {
    return this.state.id ? this.updatePizza(event) : this.addPizza(event)
  }


  render() {
    const {pizzas, topping, size, vegetarian} = this.state

    console.log()
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          topping={topping}
          size={size}
          vegetarian={vegetarian}
          updateTopping={this.updateTopping}
          updateVegetarian={this.updateVegetarian}
          updateSize={this.updateSize}
          submitPizza={this.submitPizza}
          />

        <PizzaList pizzas={pizzas} getPizza={this.getPizzaToEdit}/>
      </Fragment>
    );
  }
}

export default App;
