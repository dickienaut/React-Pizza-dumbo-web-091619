import React from "react"

const Pizza = ({pizza, getPizza}) => {
  return(
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? 'Vegetarian' : 'Has Meat'}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => getPizza(pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
