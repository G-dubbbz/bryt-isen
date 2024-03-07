import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List } from "../../services/Models";
import { getList } from "../../services/Listservice";

const FavoriteDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [list, setList] = useState<List | null>(null);

  useEffect(() => {
    const fetchListDetails = async () => {
      if (id) {
        try {
          const currentList = await getList(Number(id));
          setList(currentList);
        } catch (error) {
          console.error("Error fetching game details:", error);
        }
      }
    };

    fetchListDetails();
  }, [id]);

  if (list === null) {
    return <div className="loading">Loading...</div>;
  }

  return <p>{list.name ?? "List not found."}</p>;
};

export default FavoriteDetails;
