import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import AddItem from './AddItem';
import SearchItem from './Search';
import { useState,useEffect } from 'react';
import apiRequest from './apiRequest';



function App() {

    //API
    let API_URL = 'http://localhost:3000/items';

    //Default Items
    let [items,setItems] = useState([]);

    //Add New Items
    let [newItem,setNewItem] = useState('');

    //Search Items
    let [search,setSearch] = useState('');

    //Fetch Error
    let [fetchError, setFetchError] = useState(null);

    //Loading
    let [isLoading,setIsLoading] = useState(true);

    //Handle Check box
    async function handleCheck(id){
        let click = items.map((item)=>
        item.id===id ? {...item,checked:!item.checked}:item);
        setItems(click);

        //Update item in db
        let myItem = click.filter((item) => item.id===id);
        let updateOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({checked:myItem[0].checked})
        }
        let reqUrl = `${API_URL}/${id}`
        let result = await apiRequest(reqUrl, updateOptions);
        if (result) setFetchError(result)
    };
    
    //Delete Checklist
    async function deleteList(id){
        //It check the id you select it fitler all id execpt you select if you gave item.id===id it get that selected id only
        let delet = items.filter((item)=>
        item.id!==id);
        setItems(delet);

        //Delete item in db
        let deleteOptions = {
          method: 'DELETE'}
        let reqUrl = `${API_URL}/${id}`
        console.log("Deleting item with ID:", id);
        console.log("Request URL:", reqUrl);
        let result = await apiRequest(reqUrl, deleteOptions);
        if (result) setFetchError(result)

    };

    //Add List
    function addList(e){
      e.preventDefault();
      if(!newItem) return;
      console.log(newItem);

      //Add new item
      async function addItem(content){
        let id = items.length ? (Number(items[items.length - 1].id) + 1).toString() : '1'; // Convert to string
        let addNewItem = {id, checked:false, content};
        let listItems = [...items, addNewItem];
        setItems(listItems);

        //Add new item in db
        let postOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(addNewItem)
        }
        let result = await apiRequest(API_URL, postOptions);
        if (result) setFetchError(result)
        };
      addItem(newItem);
      setNewItem(''); //Clear the input field after saving the new item
    };

    //UseEffect
    useEffect(() => {
      const fetchItems = async () => {
          try {
              const response = await fetch(API_URL);
              if (!response.ok) throw Error("Data not recived");
              const listItems = await response.json();
              setItems(listItems);
              setFetchError(null);
          } catch (err) {
            setFetchError(err.message);
          } finally{
            setIsLoading(false);
          }
      };

      //Loading
      setTimeout(()=>{
      fetchItems();
      });
    }, [API_URL]);

  return (
    <div>
      <Header header ="ToDo List" />

      <AddItem newItem ={newItem}
                setNewItem = {setNewItem}
                addList = {addList}/>
      
      <SearchItem search = {search}
                  setSearch = {setSearch} />

      <main>
        {isLoading && <p className='load'>{`Loading Items...`}</p>}
        {fetchError && alert(`Error: ${fetchError}`)}         
        {!isLoading && !fetchError && <Content items={items.filter(item => item.content.toLowerCase().includes(search.toLowerCase()))}
                handleCheck = {handleCheck}
                deleteList = {deleteList}
                length = {items.length}/>}
      </main>

      <Footer/>
    </div>
      );
}

export default App;
