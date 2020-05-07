import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
  
  :last-child {
  border-bottom: none;
  }
`;

const List: React.FC = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const createListElement = (array: any[]) => {
    return (
      <StyledList>
        {array.map((el: Room) => (
          <StyledListEl key={el.id}>{el.name}</StyledListEl>
        ))}
      </StyledList>
    );
  };

  useEffect(() => {
    const getListAsync = async () => {
      await getList();
    };
    getListAsync().then();
  }, []);

  if (error) return <p>Nie załadowano.</p>;

  return loading ? <p>Ładuję...</p> : createListElement(list);
};

export default List;
