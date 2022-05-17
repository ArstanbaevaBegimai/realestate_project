import { Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import HouseCard from "../HouseCard";
import MainPageStyle from "./MainPageStyle.css";
import { houseContext } from "../contexts/HouseContext";
import Footer from "../Footer";
import Loader from "../Loader";
import Search from "../Search";
import { useSearchParams } from "react-router-dom";

const MainPage = () => {
  const { houses, getAllHouses } = useContext(houseContext);

  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    q: search,
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  useEffect(() => {
    setSearchParams(params);
    getAllHouses();
  }, [search]);

  if (!houses) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <div className="container">
      <div className="wallpaper">
        <div className="components-group">
          <Search search={search} setSearch={setSearch} />
        </div>
      </div>

      <Container
        sx={{
          width: "90%",
          my: "50px",
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
          flexWrap: "wrap",
          my: "80px",
        }}
      >
        {houses.map((house) => {
          return (
            <HouseCard
              key={house.id}
              title={house.title}
              rooms={house.rooms}
              area={house.area}
              price={house.price}
              currency={house.currency}
              description={house.description}
              image={house.image}
              city={house.city}
              id={house.id}
            />
          );
        })}
      </Container>
      <Footer />
    </div>
  );
};

export default MainPage;
