import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AddButton from "../../components/buttons/AddButton/AddButton";
import List from "../../components/lists/List/List";

const MainHeader = styled.h1`
  text-transform: uppercase;
  text-align: center;
`;
const SecondaryHeader = styled.h2`
  text-transform: uppercase;
  text-align: center;
`;

const StyledSection = styled.section`
  text-align: center;
`;

const HomePage: React.FC = () => (
  <>
    <header>
      <MainHeader>kalambury</MainHeader>
    </header>
    <StyledSection>
      <Link to="/create">
        <AddButton>NOWY STÓŁ</AddButton>
      </Link>
      <SecondaryHeader>DOSTĘPNE STOŁY</SecondaryHeader>
      <List />
    </StyledSection>
  </>
);

export default HomePage;
