import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import FormDialog from "../../dialogs/FormDialog/FormDialog";
import { Redirect } from "react-router";

const StyledList = styled.ul`
  border: 1px solid navy;
  padding: 0;
  max-width: 700px;
  list-style: none;
  margin: auto;
`;

const StyledListEl = styled.li`
  text-align: left;
  padding: 5px;
  border-bottom: 1px dashed darkgray;
  cursor: pointer;
  transition: all 0.25s;

  :hover {
    background-color: lightgray;
  }

  :last-child {
    border-bottom: none;
  }
`;

const List: FC = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState("");
  const [pinError, setPinError] = useState(false);
  const [choosenRoomId, setChoosenRoomId] = useState<string | undefined>(
    undefined
  );
  const [redirectTo, setRedirectTo] = useState(false);

  const handleClickOpen = (event: React.MouseEvent<HTMLLIElement>) => {
    event.persist();
    setChoosenRoomId(event.currentTarget?.dataset?.roomId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChoosenRoomId(undefined);
    setDialogValue("");
  };

  const handleDialogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setDialogValue(event.target.value);
  };

  const handleLogin = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_HOST}/room/login`, {
        pin: dialogValue,
        roomId: choosenRoomId
      });
      setPinError(false);
      setRedirectTo(true);
      handleClose();
    } catch (e) {
      setPinError(true);
    }
  };

  interface Room {
    id: string;
    name: string;
  }

  const getList = async (): Promise<void> => {
    try {
      setLoading(true);
      const axiosResponse = await axios.get(
        `${process.env.REACT_APP_API_HOST}/room`
      );
      setList(axiosResponse.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const createListFromArr = (array: any[]) => {
    return (
      <StyledList>
        {array.map((room: Room) => (
          <StyledListEl
            key={room.id}
            onClick={handleClickOpen}
            data-room-id={room.id}
          >
            {room.name}
          </StyledListEl>
        ))}
      </StyledList>
    );
  };

  useEffect(() => {
    const getListAsync = async () => {
      await getList();
    };
    getListAsync();
  }, []);

  if (error) return <p>Nie załadowano.</p>;

  return loading ? (
    <CircularProgress />
  ) : (
    <>
      {createListFromArr(list)}
      {open ? (
        <FormDialog
          open={open}
          handleClose={handleClose}
          handleSubmit={handleLogin}
          handleChange={handleDialogChange}
          title={"Podaj PIN stołu"}
          label={"PIN"}
          contextText={"Wpisz 4-cyfrowy PIN, aby dołączyć"}
          value={dialogValue}
          error={pinError}
          errorMsg={pinError ? "Zły PIN" : " "}
        />
      ) : null}
      {redirectTo ? <Redirect to={`/room/${choosenRoomId}`} /> : null}
    </>
  );
};

export default List;
