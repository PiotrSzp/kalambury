import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

const StyledAddBoxRoundedIcon = styled(AddBoxRoundedIcon).attrs(() => {})`
  ${props => (props.sibling ? "margin-right: 15px" : "")};
`;

const AddButton: React.FC = props => {
  return (
    <Button component={"button"} variant={"outlined"} >
      <StyledAddBoxRoundedIcon sibling={props.children} />
      {props.children}
    </Button>
  );
};

export default AddButton;
