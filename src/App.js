import React from 'react';
import axios from 'axios';
import { DropDown } from './components/DropDown';
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: 'Helvetica Neue', Ariel, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(248, 247, 245);
  padding: 20px;
  }
`;

const SelectLabel = styled.div`
  color: rgba(0, 0, 0, .8);
  font-size: 90%;
`;

class App extends React.Component {
  state = {
    loading: true,
    error: "",
    data: null
  };
  loadData = () => {
    this.setState({ loading: true });
    return axios
      .get(
        `https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json`
      )
      .then(result => {
        this.setState({
          data: result.data.data,
          loading: false,
          error: false
        });
      })
      .catch(error => {
        console.error("error: ", error);
        this.setState({
          // objects cannot be used as a react child
          // -> <p>{error}</p> would throw otherwise
          error: `${error}`,
          loading: false
        });
      });
  };
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { loading, error, data } = this.state;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return (
        <p>
          There was an error loading the managers
          <button onClick={this.loadData}>Try again</button>
        </p>
      );
    }

    return (
      <>
        <GlobalStyle />

        <SelectLabel htmlFor="manager">Manager</SelectLabel>
        <DropDown
          title="Choose Manager"
          list={data}
        />
      </>
    );
  }
}

export default App;
