import { regions } from '../datas/regions.json';
import { useNavigate } from 'react-router-dom';
import { getUserDatas } from '../api/routesApi';
import { useLoaderContext } from '../context/LoaderCotext';
import { useRef, useState } from 'react';

type FindPlayerFormProps = {
  label?: string | null;
  className?: string;
};

export default function FormSearchPlayer({
  label,
  className,
}: FindPlayerFormProps) {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoaderContext();
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
    showLoader();
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
        hideLoader();
      }
    } catch {
      setErrorMesssage(
        'Your summoner name and/or selectionned region are incorrect(s)'
      );
      hideLoader();
    }
  };

  return (
    <form
      className={className}
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
