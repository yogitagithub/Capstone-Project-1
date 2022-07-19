import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './grocery.css';

function Paper() {

    const [groceryItem, setGroceryItem] = useState('');
    const [grocery, setGrocery] = useState([]);
    const [line, setLine] = useState(false);

    useEffect(() => {
        getProducts();
    }, [])
    
    const handleAddItem = () => {

        fetch('http://localhost:3003/grocery/add', {
            method: 'POST',
            body: JSON.stringify({groceryItem, isPurchased: false}),
            headers: {
                'Content-type': "application/json; charset=UTF-8"
            }
        })
          .then(resp =>
            resp.json()
        )
           .then(dt => {
               alert('Item inserted successfully')
        })
    }

    async function getProducts()
    {
        let insert = await fetch('http://localhost:3003/grocery/getAll');
        insert = await insert.json();        
        setGrocery(insert); 
    }

    const handlePurchaseItem = (id) => {

        setLine(true);
        console.log(id);

         fetch('http://localhost:3003/grocery/updatePurchaseStatus/'+id, 
            {
                method: 'PUT',
                body: JSON.stringify({id}),
                headers: {
                    'Content-type': "application/json; charset=UTF-8"
            }
        })
            .then(resp =>
                resp.json()
            )
            .then(dt => {
                alert('Item updated successfully')
            })
    }

    const removeProduct = async (id) => {
        console.log(id);

        fetch('http://localhost:3003/grocery/deleteGroceryItem/'+id, 
        {
            method: 'DELETE',
            body: JSON.stringify({id}),
                headers: {
                    'Content-type': "application/json; charset=UTF-8"
                }
        })
        .then(resp =>
            resp.json()
        )
        .then(dt => {
            alert('Item deleted successfully')
            getProducts();
        })
    }
 
    return(
        
        <div>
            <p className="light"><ins>Monthly Grocery Planning</ins></p>
            <h1 className="guest">Plan for the month of July</h1>
            
            <form>
                <div>
                    <input type="text" placeholder="Add your items here..." className="lamp" value={groceryItem} onChange={(ev) => {setGroceryItem(ev.target.value)}}></input>
                </div>

                <div>
                    <input type="button" value="ADD" className="get" onClick={() => handleAddItem()}></input>
                </div>
            </form>

            <div>
                <div className="table">
                    <table>
                        {grocery.map(items => <tr>
                            <td style={{ textDecoration: line ? "line-through" : "none" }}>{items.groceryItem}</td>
                            <td><span className="delete"><input type="button" value="Purchase" className="circle" onClick={() => handlePurchaseItem(items._id)}></input></span></td>
                            <td><span className="wire"><input type="button" value="Remove" className="sphere" onClick={() => removeProduct(items._id)}></input></span></td>
                            </tr>)}
                    </table>
                </div>                        

            </div>
        </div> 
    );
}
export default Paper;