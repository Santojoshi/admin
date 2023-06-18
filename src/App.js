import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import search from './search.png'

function App() {

  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'); // Replace with your API URL
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data ? data.filter((item) =>
    item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];


  

  return (
    <>

      <h1  class="mainhead">Wolcome to admin Pannel</h1>
    <main>
        <div id="table-section">

            <form action="/">
                <img src={search} alt="Search Icon" />
                <input type="text" placeholder="Enter something" name="search-box" id="search-box" value={searchTerm}
              onChange={handleSearch} />
            </form>

            <div id="table-wrapper">

                <div id="table-headers">
                    <table>
                        <thead>
                            <tr>
                                <th class="column1">Id</th>
                                <th class="column2">FirstName</th>
                                <th class="column3">LastName</th>
                                <th class="column4">Email</th>
                                <th class="column5">Phone</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div id="table-data">
                    <table>
                        <tbody>
                        {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr className={`data-row ${selectedItem && selectedItem.id === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setSelectedItem(item) }>
                        <td className="column1">{item.id}</td>
                        <td className="column2">{item.firstName}</td>
                        <td className="column3">{item.lastName}</td>
                        <td className="column4">{item.email}</td>
                        <td className="column5">{item.phone}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No results found.</td>
                    </tr>
                  )}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>


        

        <div id="info-wrapper">
            <h1>Details</h1>
            <p>Click on a table item to get detailed information</p>
            <div id="info-content">
  {selectedItem ? (
    <>
      <div>
        <b>User selected:</b> {selectedItem.firstName} {selectedItem.lastName}
      </div>
      <div>
        <b>Description: </b>
        <textarea cols="50" rows="5" readOnly>
          {selectedItem.description}
        </textarea>
      </div>
      <div>
        <b>Address:</b> {selectedItem.address.streetAddress}
      </div>
      <div>
        <b>City:</b> {selectedItem.address.city}
      </div>
      <div>
        <b>State:</b> {selectedItem.address.state}
      </div>
      <div>
        <b>Zip:</b> {selectedItem.address.zip}
      </div>
    </>
  ) : (
    <p>No item selected.</p>
  )}
</div>

        </div>

    </main>
    </>
  );
}

export default App;


