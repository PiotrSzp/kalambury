import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import AddButton from "../../components/buttons/AddButton/AddButton";
import List from "../../components/lists/List/List";
import { MainHeader, SecondaryHeader } from "../../layout/headers";
import { StyledSection } from "../../layout/wrappers";

const HomePage: FC = () => (
  <Fragment data-testid="HomePage">
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
  </Fragment>
);

export default HomePage;
