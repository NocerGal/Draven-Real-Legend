import { useRef, useState } from 'react';
import DRAVEN_IMG from '../assets/Draven_6.jpg';
import { regions } from '../datas/regions.json';
import { useNavigate } from 'react-router-dom';
import { getUserDatas } from '../api/routesApi';

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto flex col-auto">
      <div className="flex gap-8 flex-col items-start justify-center align-top my-14 mt-32 w-full px-14 md:flex-row">
        <div className="flex gap-7 flex-col h-full w-full md:w-1/2 align-middle">
          <div className="">
            <h1 className="text-5xl bg-gradient-to-br from-blue-9 to-blue-12 bg-clip-text text-transparent font-bold pb-6 dark:from-blue-2 dark:to-blue-7">
              Draven the Real Legend
            </h1>
            <p className="text-blue-12 text-xl dark:text-bluedark-12">
              The website that loves itself, likes its visitors a little, but
              has a fondness for LoL
            </p>
          </div>
          <div>
            <FindPlayerForm label="Tape your summoner name and select your region" />
          </div>
        </div>
        <img
          className="h-96 w-96 m-auto md:margin-none hidden md:block"
          src={DRAVEN_IMG}
          alt="image de draven"
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
    </div>
  );
}

type FindPlayerFormProps = {
  label: string | null;
};

function FindPlayerForm({ label }: FindPlayerFormProps) {
  const navigate = useNavigate();
  const [inputValue] = useState<string | null>(
    localStorage.getItem('summonerName')
  );
  const refInput = useRef<null | HTMLInputElement>(null);
  const refSelect = useRef<null | HTMLSelectElement>(null);
  const [regionUserValue] = useState<string | null>(
    localStorage.getItem('regionUser')
  );
  const [regionRiotValue] = useState<string | null>(
    localStorage.getItem('regionRiot')
  );
  const [errorMessage, setErrorMesssage] = useState<string | null>(null);

  const handleErrorSubmit = () => {
    setErrorMesssage('Merci de renseigner votre summoner name');
  };

  const handleSubmit = async () => {
    if (refInput.current && refSelect.current) {
      localStorage.setItem('regionRiot', refSelect.current.value);
      localStorage.setItem(
        'regionUser',
        refSelect.current.options[refSelect.current.selectedIndex].text
      );
    } else {
      return;
    }

    try {
      const { responseStatus, userDatas } = await getUserDatas(
        refSelect.current.value,
        refInput.current.value
      );

      localStorage.setItem('summonerName', userDatas.name);
      if (responseStatus === 200) {
        navigate(`/${refSelect.current.value}/${userDatas.puuid}`);
      }
    } catch {
      setErrorMesssage(
        'Votre summoner et/ou la région seletionnée est/sont incorrectes'
      );
    }
  };

  return (
    <form
      id="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();

        refInput.current?.value == null || refInput.current?.value === ''
          ? handleErrorSubmit()
          : handleSubmit();
      }}
    >
      <div className="flex flex-col">
        <label
          className="text-xl text-blue-12 dark:text-bluedark-12 mb-4"
          htmlFor="summoner-name"
        >
          {label}
        </label>
        <div className="flex gap-4 mb-4">
          <div className="flex gap-2 h-full text-blue-12 dark:text-bluedark-1 border-2 border-blue-6  bg-blue-1 focus:outline-blue-8 rounded-2xl max-w-xs focus-within:border-blue-8 dark:focus-within:border-blue-8">
            <input
              {...(inputValue ? { defaultValue: inputValue } : {})}
              id="summoner-name"
              ref={refInput}
              type="text"
              required
              className="w-full py-1.5 rounded-l-2xl px-2.5 outline-none"
            />
            <label
              className="hidden text-xl text-blue-12 dark:text-bluedark-12 mb-2"
              htmlFor="region-select"
            >
              Region
            </label>
            <select
              id="region-select"
              ref={refSelect}
              className="rounded-r-2xl outline-none pl-1.5 border-l-2 cursor-pointer border-blue-6 dark:border:bluedark-6"
            >
              {regionUserValue && regionRiotValue ? (
                <>
                  <option value={regionRiotValue}>{regionUserValue}</option>
                  {regions.map(
                    (region) =>
                      region.regionRiot !== regionUserValue && (
                        <option
                          key={region.regionRiot}
                          value={region.regionRiot}
                        >
                          {region.regionUser}
                        </option>
                      )
                  )}
                </>
              ) : (
                regions.map((region) => (
                  <option key={region.regionRiot} value={region.regionRiot}>
                    {region.regionUser}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            className="Button px-4 py-21 rounded-xl text-blue-12 bg-gradient-to-br from-blue-4 to-blue-7 hover:from-blue-4 hover:to-blue-9  dark:from-blue-2 dark:to-blue-7 dark:hover:from-bluedark-12 dark:hover:to-bluedark-8 dark:hover:text-bluedark-12"
            type="submit"
          >
            Search
          </button>
        </div>
        {errorMessage && (
          <p className="text-sm text-blue-12 dark:text-bluedark-12 mb-2">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
