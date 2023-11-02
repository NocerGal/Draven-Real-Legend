import { useParams } from 'react-router-dom';
import { getUserMatchHistory } from '../api/routesApi';
import { continents } from '../datas/regions.json';
import { useEffect, useState } from 'react';

export default function UserInfos() {
  const { region, puuid } = useParams();
  const [listMatchHistory, setListMatchHistory] = useState<string[]>();
  const [summonerName, setSummonerName] = useState<string | null>(
    localStorage.getItem('summonerName')
  );

  interface Continents {
    [key: string]: string;
  }

  const continentsDatas: Continents = continents;

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const matchHistory = await getUserMatchHistory(
          puuid as string,
          continentsDatas[region as string]
        );
        setListMatchHistory(matchHistory);
      } catch (error) {
        console.error('Request failed. See next error => ', error);
      }
    };

    fetchMatchHistory();
  }, []);

  return (
    <section>
      <div>
        <h1 className="text-3xl text-blue-12 text-center">
          Warm welcome {summonerName} to your match history! Draven will judge
          it soon.
        </h1>
      </div>
      <div>
        <UserInfosSideBar />
        <UserMatchHistory />
      </div>
    </section>
  );
}

function UserMatchHistory() {
  return null;
}

function UserInfosSideBar() {
  return null;
}
