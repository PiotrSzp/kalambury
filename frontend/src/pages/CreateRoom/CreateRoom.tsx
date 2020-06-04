import React, { FC, useState } from "react";
import axios from "axios";
import { IconButton, TextField } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { MainHeader } from "../../layout/headers";
import { FullWidthDiv, StyledSection } from "../../layout/wrappers";
import { VerticalForm } from "../../layout/forms";
import { Redirect } from "react-router";
import FormDialog from "../../components/dialogs/FormDialog/FormDialog";

const CreateRoom: FC = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [pin, setPin] = useState("0000");
  const [categories, setCategories] = useState([
    "OSOBA",
    "MIEJSCE",
    "FILM",
    "FREESTYLE",
  ]);
  const [rounds, setRounds] = useState([
    { name: "MÓWIENIE", time: 60 },
    { name: "MÓWIENIE", time: 60 },
    { name: "JEDNO SŁOWO", time: 30 },
  ]);
  const [redirect, setRedirect] = useState();

  const handleSubmit = async () => {
    const data = {
      name,
      pin,
      config: JSON.stringify({ categories: categories, rounds: rounds }),
    };
    try {
      const axiosResponse = await axios.post(
        `${process.env.REACT_APP_API_HOST}/room`,
        data
      );
      if (axiosResponse) {
        setRedirect(axiosResponse.data.id);
      }
    } catch (e) {
      console.log(e);
      setNameError("Nazwa zajęta");
    }
  };

  return (
    <div data-testid="CreateRoom">
      <MainHeader>TWORZENIE STOŁU</MainHeader>
      <StyledSection>
        <VerticalForm
          action=""
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            id="name"
            required={true}
            variant={"outlined"}
            label={"Nazwa:"}
            InputLabelProps={{ shrink: true }}
            margin={"normal"}
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.currentTarget.value);
              setNameError("");
            }}
            error={!!nameError}
            helperText={nameError}
            autoFocus
          />
          <TextField
            id="pin"
            required={true}
            variant={"outlined"}
            label={"PIN:"}
            InputLabelProps={{ shrink: true }}
            margin={"normal"}
            value={pin}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.persist();
              setPin((prevState) => {
                const newPin = event.target.value;
                if (newPin?.length <= 4) {
                  return newPin;
                } else {
                  return prevState;
                }
              });
            }}
          />
          <p>Kategorie:</p>
          {categories.map((category, index) => (
            <FullWidthDiv key={index}>
              <TextField
                id={"cat-" + (index + 1)}
                variant={"outlined"}
                label={"Kategoria " + (index + 1)}
                InputLabelProps={{ shrink: true }}
                margin={"normal"}
                value={category}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.persist();
                  setCategories((prevState) => {
                    const newState = [...prevState];
                    newState[index] = event.currentTarget.value.toUpperCase();
                    return newState;
                  });
                }}
              />
              <IconButton
                id={"catBtn-" + (index + 1)}
                aria-label="delete"
                data-cat-id={index}
                onClick={(event) => {
                  event.preventDefault();
                  setCategories((prevState) => {
                    const newState = [...prevState];
                    newState.splice(index, 1);
                    return newState;
                  });
                }}
              >
                <Delete />
              </IconButton>
            </FullWidthDiv>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              setCategories((prevState) => {
                const newCats = [...prevState, ""];
                return newCats;
              });
            }}
          >
            Dodaj
          </button>
          <p>Tury:</p>
          {rounds.map((round, index) => (
            <FullWidthDiv key={index}>
              <TextField
                id={"round-" + (index + 1)}
                variant={"outlined"}
                label={"Tura " + (index + 1)}
                InputLabelProps={{ shrink: true }}
                margin={"normal"}
                value={round.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.persist();
                  setRounds((prevState) => {
                    const newState = [...prevState];
                    newState[
                      index
                    ].name = event.currentTarget.value.toUpperCase();
                    return newState;
                  });
                }}
              />
              <IconButton
                id={"roundBtn-" + (index + 1)}
                aria-label="delete"
                data-cat-id={index}
                onClick={(event) => {
                  event.preventDefault();
                  setRounds((prevState) => {
                    console.log(index);
                    const newState = [...prevState];
                    newState.splice(index, 1);
                    return newState;
                  });
                }}
              >
                <Delete />
              </IconButton>
              <br />
              <FullWidthDiv>
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    setRounds((prevState) => {
                      const newState = [...prevState];
                      newState[index].time =
                        prevState[index].time - 10 < 0
                          ? 0
                          : prevState[index].time - 10;
                      return newState;
                    });
                  }}
                >
                  <RemoveCircleIcon />
                </IconButton>
                {round.time + " s"}
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    setRounds((prevState) => {
                      const newState = [...prevState];
                      newState[index].time = prevState[index].time + 10;
                      return newState;
                    });
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </FullWidthDiv>
            </FullWidthDiv>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              setRounds((prevState) => {
                return [...prevState, { name: "", time: 60 }];
              });
            }}
          >
            Dodaj
          </button>
          <br />
          <br />
          <br />
          <button type={"submit"}>UTWÓRZ STÓŁ!</button>
        </VerticalForm>
      </StyledSection>
      {redirect ? <Redirect to={`/room/${redirect}`} /> : null}
    </div>
  );
};

export default CreateRoom;
