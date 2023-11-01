import { useParams } from 'react-router-dom';
import { getUserMatchHistory } from '../api/routesApi';
import { continents } from '../datas/regions.json';
import { useEffect, useState } from 'react';

export default function UserInfos() {
  const { region, puuid } = useParams();

  const [matchHistory, setMatchHistory] = useState<string[]>();

  interface Continents {
    [key: string]: string;
  }

  const continentsDatas: Continents = continents;

  useEffect(() => {
    const userMatchHistory = async () => {
      getUserMatchHistory(puuid as string, continentsDatas[region as string])
        .then((matchHistory) => {
          setMatchHistory(matchHistory);
        })
        .catch((error) => {
          console.error('Request failed. See next error => ', error);
        });
    };
    userMatchHistory();
    console.log(matchHistory);
  });

  return <div>UserInfos</div>;
}
